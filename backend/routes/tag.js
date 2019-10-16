const express = require("express");
const router = express.Router();
const { create, list, read, remove } = require("../controllers/tag");

// Validators
const { runValidation } = require("../validators");
const { tagsCreateValidator } = require("../validators/tags");
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post(
  "/tag",
  tagsCreateValidator,
  runValidation,
  requireSignin,
  adminMiddleware,
  create
);

router.get("/tag", list);
router.get("/tag/:slug", read);
router.delete("/tag/:slug", requireSignin, adminMiddleware, remove);

module.exports = router;
