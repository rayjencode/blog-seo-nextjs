const { check } = require("express-validator");

exports.tagsCreateValidator = [
  check("name", "Tag name is required")
    .not()
    .isEmpty()
];
