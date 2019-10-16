const { check } = require("express-validator");

exports.categoryCreateValidator = [
  check("name", "Category name is required")
    .not()
    .isEmpty()
];
