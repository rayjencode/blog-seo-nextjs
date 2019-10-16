const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  requireSignin
} = require("../controllers/auth");

// Validators
const { runValidation } = require("../validators");
const {
  userSignupValidator,
  userSigninValidator
} = require("../validators/auth");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout);

// test
// router.get("/secret", requireSignin, (req, res) => {
//   res.json({
//     user: req.user
//   });
// });

module.exports = router;
