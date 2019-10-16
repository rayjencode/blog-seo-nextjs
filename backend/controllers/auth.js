const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

// Import Model
const User = require("../models/user");

exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email already exist"
      });
    }

    let username = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;
    let newUser = new User({ name, email, password, profile, username });

    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({ err: err });
      }

      res.json({
        message: "Signup Success! Please signin."
      });
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  // Check if user exist
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Incorrect Email and Passowrd"
      });
    }
    // Authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Incorrect Email and password"
      });
    }
    // Generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    res.cookie("token", token, { expiresIn: "1d" });

    const { _id, username, name, role } = user;
    return res.json({
      token,
      user: { _id, username, name, role, email }
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout Success"
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET
});

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user not found"
      });
    }
    req.profile = user;
    next();
  });
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;
  User.findById({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found"
      });
    }
    if (user.role !== 1) {
      return res.status(400).json({
        error: "Admin resource. Access denied"
      });
    }
    req.profile = user;
    next();
  });
};
