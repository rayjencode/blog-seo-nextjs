const { check } = require("express-validator");

exports.userSignupValidator = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("Name is required"),
  check("email")
    .isEmail()
    .withMessage("Email must be valid"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
];

exports.userSigninValidator = [
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password is not valid").isLength({ min: 6 })
];

exports.forgotPasswordValidator = [
  check("email", "Must be a valid Email address")
    .not()
    .isEmpty()
    .isEmail()
];

exports.resetPasswordValidator = [
  check("newPassword", "Password must be at least 6 characters long")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
];
