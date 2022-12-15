const Author = require("../models/author");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const { validationResult } = require("express-validator");

exports.signup = (req, res) => {
  //check for invalid post requests
  const errors = validationResult(req);
  console.log(req.body);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      err: errors.array()[0].msg,
    });
  }

  //save the user in db

  const user = new Author({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
  });
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save user in db ",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      id: user._id,
    });
  });
};

//sigin
exports.signin = (req, res) => {
  const { email, password } = req.body;

  //check for invalid post requests
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  Author.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user email doesnt exist",
      });
    }
    if (user.password!=password) {
      return res.status(401).json({
        error: "email and pass do not match",
      });
    }

    // =======================sign in the user===============
    // create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //  put in cookies
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send data to frontend
    const { _id, name, email, phoneNumber } = user;
    res.json({ token, user: { _id, name, email, phoneNumber } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: " Author Signout successfull ",
  });
};

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth", // auth is put in request
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};
