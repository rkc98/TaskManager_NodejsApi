const express = require("express");
require("./db/mongoose");
// const brycpt = require("bcryptjs");
const app = express();
const userRoutes = require("./routers/user");
const taskRoutes = require("./routers/task");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json()); // converts json data into objects
app.use(userRoutes);
app.use(taskRoutes);
// app.use(express.static(__dirname));
const upload = multer({
  dest: "images",
});

app.post("/upload", upload.single("upload"), (req, res) => {
  res.send({
    message: "image Uploaded successfully",
  });
});

// const jwtFunction = async () => {
//   // const password = "Pass@123";
//   // const hasedPass = await brycpt.hash(password, 8);
//   // console.log(password, hasedPass);
//   // const isMatch = await brycpt.compare("pass@123", hasedPass);
//   // console.log(isMatch);
//   const token = jwt.sign({ _id: "1234" }, "thisisnodejs", {
//     expiresIn: "2 weeks",
//   });
//   // console.log(token);
//   const dataequals = jwt.verify(token, "thisisnodejs");
//   // console.log(dataequals);

//   const help = {
//     name: "abc",
//   };

//   stringify = JSON.stringify(help); // objects to Stringify
//   objects = JSON.parse(stringify); // Stringify to objects
//   console.log(stringify, objects);
// };
// jwtFunction();

app.listen(port, () => {
  console.log("server is running on port " + port);
});
