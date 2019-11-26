const express = require("express");
const router = express.Router();
const {
  create,
  list,
  listByUser,
  listAllBlogsCategoriesTags,
  read,
  remove,
  update,
  photo,
  listRelated,
  listSearch
} = require("../controllers/blog");
const {
  requireSignin,
  adminMiddleware,
  authMiddleware,
  canUpdateDeleteBlog
} = require("../controllers/auth");

router.post("/blog", requireSignin, adminMiddleware, create);
router.post("/blogs-categories-tags", listAllBlogsCategoriesTags);
router.get("/blogs", list);
router.get("/blog/:slug", read);
router.delete("/blog/:slug", requireSignin, adminMiddleware, remove);
router.put("/blog/:slug", requireSignin, adminMiddleware, update);
router.get("/blog/photo/:slug", photo);
router.post("/blogs/related", listRelated);
router.get("/blogs/search", listSearch);

// Auth User blog crud
router.post("/user/blog", requireSignin, authMiddleware, create);
router.get("/:username/blogs", listByUser);
router.delete(
  "/user/blog/:slug",
  requireSignin,
  authMiddleware,
  remove,
  canUpdateDeleteBlog
);
router.put(
  "/user/blog/:slug",
  requireSignin,
  authMiddleware,
  update,
  canUpdateDeleteBlog
);

module.exports = router;
