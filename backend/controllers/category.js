const Category = require("../models/category");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbErrorHandler");

// Import Blog Model
const Blog = require("../models/blog");

// Create Category
exports.create = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let category = new Category({ name, slug });

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};

// Get All category
exports.list = (req, res) => {
  Category.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};

// Get Single Category by slug
exports.read = async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase();

    let category = await Category.findOne({ slug });

    if (!category) {
      return res.status(404).json({
        message: "404 Category not found"
      });
    }
    // res.json(category);
    let blog = await Blog.find({ categories: category })
      .populate("categories", "_id name slug")
      .populate("tags", "_id name slug")
      .populate("postedBy", ["_id", "name", "username"])
      .select("-photo");

    res.json({ category: category, blogs: blog });
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};

// Remove Category
exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Category.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      message: "Category deleted successfully"
    });
  });
};
