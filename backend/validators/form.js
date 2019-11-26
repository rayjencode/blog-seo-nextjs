const { check } = require("express-validator");

exports.contactFormValidator = [
  check("name", "Name is Required")
    .not()
    .isEmpty(),
  check("email", "Must be valid email address").isEmail(),
  check("message", "Message must be at least 20 character long")
    .not()
    .isEmpty()
    .isLength({ min: 20 })
];
