const mongoose = require("mongoose");
const validator = require("validator");
mongoose
  .connect(process.env.MONGODB_URL)
  .then((response) => {
    console.log("connected to database");
  })
  .catch((err) => console.log(err));

// const task = mongoose.model("Task", {
//   description: {
//     type: String,
//   },
//   status: {
//     type: Boolean,
//   },
// });

// const firstTask = new task({
//   description: "some new data",
//   status: true,
// });

// firstTask
//   .save()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => console.log(err));
