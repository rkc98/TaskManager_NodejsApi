const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middlewares/Auth");
const multer = require("multer");
const path = require("path");

// get individual users
router.get("/users/me", auth, async (req, res) => {
  try {
    // const users = await User.find();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, //1MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("please upload an image"));
    }
    cb(undefined, true);
  },
});

//upload profile avatar images on server
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    try {
      // console.log(req.file);
      req.user.avatar = req.file.path; // adding path to the database
      await req.user.save();
      res.status(200).send({
        message: "profile image uploaded sucessfully",
      });
    } catch (error) {
      res.status(500).send({
        message: error,
      });
    }
  },
  (err, req, res, next) => {
    res.status(400).send({
      message: err.message,
    });
  }
);

//delete the profile avatar

router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.status(200).send({
      message: "profile picture deleted",
    });
  } catch (error) {
    res.status(500).send({
      error: error,
    });
  }
});

// get all users route
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

// add users
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    // await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
    // res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//login user
router.post("/users/login", async (req, res) => {
  try {
    // console.log(req.body.email, req.body.password);
    const user = await User.findUserByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

//logout users
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});

//logout users instances via token from every device
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

//get user by id
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  try {
    const result = await User.findById(_id);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

//update user details
// router.patch("/users/:id", async (req, res) => {
//   const _id = req.params.id;
//   const updates = Object.keys(req.body);
//   console.log(updates);
//   const allowed = ["name", "email", "password", "age"];
//   const isValid = updates.every((update) => allowed.includes(update));
//   console.log(isValid);
//   if (!isValid) {
//     return res.send({
//       message: "updated not allowed",
//     });
//   }

//   try {
//     const user = await User.findById(_id);
//     updates.forEach((update) => {
//       user[update] = req.body[update];
//     });
//     await user.save();

//     if (!user) {
//       return res.status(404).send({
//         message: "no user found",
//       });
//     }
//     res.status(200).send(user);
//   } catch (error) {
//     res.status(400).send({ message: error });
//   }
// });

//update your details

router.patch("/users/me", auth, async (req, res) => {
  // const _id = req.params.id;
  const updates = Object.keys(req.body);
  console.log(updates);
  const allowed = ["name", "email", "password", "age"];
  const isValid = updates.every((update) => allowed.includes(update));
  // console.log(isValid);
  if (!isValid) {
    return res.send({
      message: "updated not allowed",
    });
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();

    res.status(200).send(req.user);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

//delete user by id
// router.delete("/users/:id", async (req, res) => {
//   const id = req.params.id;

//   try {
//     const result = await User.findByIdAndDelete(id, { new: true });
//     res.status(200).send(result);
//   } catch (error) {
//     res.status(404).send({
//       message: error,
//     });
//   }
// });

// delete yourself by using auth token
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
