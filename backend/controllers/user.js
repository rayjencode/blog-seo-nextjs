const User = require("../models/user");

// Give user information or user profile
exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};
