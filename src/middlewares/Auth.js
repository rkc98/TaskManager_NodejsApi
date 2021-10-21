const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "something");
    console.log("decode", decoded);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    console.log("user", user);
    req.user = user;
    req.token = token;
    next();
    // console.log(token);
  } catch (e) {
    res.status(401).send({ error: "Please Authenticate" });
  }
  console.log("auth");
  //   next();
};

module.exports = auth;
