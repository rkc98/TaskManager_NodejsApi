const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.default.isEmail(value)) {
          throw new Error("Inavlid email");
        }
      },
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      validate(value) {
        console.log(value);
        if (value.length < 6) {
          console.log("error");
          throw new Error("invalid Password");
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Age is not valid");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.toJSON = function () {
  const user = this;
  console.log(user);
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

//generate auth token

userSchema.methods.generateAuthToken = async function () {
  console.log("called");
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "something");
  console.log(user);
  user.tokens = user.tokens.concat({ token });
  console.log(user);
  await user.save();

  return token;
};

// user login
userSchema.statics.findUserByCredentials = async (email, password) => {
  console.log("method", email, password);
  const user = await User.findOne({ email: email });
  await console.log("here");
  await console.log(user);
  if (!user) {
    console.log("here");
    throw new Error("unable to login in user not found");
  }

  const ismatch = await bcrypt.compare(password, user.password);

  if (!ismatch) {
    throw new Error("password is incorrect");
  }

  return user;
};

//hash the plain text password
userSchema.pre("save", async function (next) {
  const user = this;

  console.log("just before saving");

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

//delete the task when the user gets deleted

userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// const me = new user({
//   name: "Macbook",

//   email: "abc@abc.com",
//   password: "pass",
// });

// me.save()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => console.log(err));
