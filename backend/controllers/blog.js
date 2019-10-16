const formidable = require("formidable");
const slugify = require("slugify");
const stripHtml = require("string-strip-html");
const _ = require("lodash");
const fs = require("fs");
const { smartTrim } = require("../helpers/blog");

// Import Error handler
const { errorHandler } = require("../helpers/dbErrorHandler");

// Import models
const Category = require("../models/category");
const Blog = require("../models/blog");
const Tag = require("../models/tag");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image could not upload " });
    }
    const { title, body, categories, tags, metaTitle, slug, metaDesc } = fields;

    // Validation
    if (!title || !title.length) {
      return res.status(400).json({
        error: "Title is required"
      });
    }
    if (!body || body.length < 200) {
      return res.status(400).json({
        error: "Content is too short"
      });
    }

    if (!categories || categories.length === 0) {
      return res.status(400).json({
        error: "At least one category is required"
      });
    }

    if (!tags || tags.length === 0) {
      return res.status(400).json({
        error: "At least one tag is required"
      });
    }

    let blog = new Blog();
    blog.title = title;
    blog.body = body;
    blog.excerpt = smartTrim(body, 320, " ", " ...");
    blog.slug = slugify(title).toLowerCase();
    blog.metaTitle = `${title} | ${process.env.APP_NAME}`;
    blog.metaDesc = stripHtml(body.substring(0, 160));
    blog.postedBy = req.user._id;

    // Categories and tags
    // let arrayOfCategories = categories && categories.split(",");
    // let arrayOfTags = tags && tags.split(",");

    const categoryFields = {};
    if (categories) {
      categoryFields.categories = categories
        .split(",")
        .map(category => category.trim());
    }
    if (tags) {
      categoryFields.tags = tags.split(",").map(tag => tag.trim());
    }

    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size"
        });
      }
      blog.photo.data = fs.readFileSync(files.photo.path);
      blog.photo.contentType = files.photo.type;
    }

    blog.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }

      Blog.findByIdAndUpdate(
        result._id,
        { $set: categoryFields },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err)
          });
        } else {
          res.json(result);
        }
      });
    });
  });
};

// Get list all blogs
exports.list = async (req, res) => {
  try {
    const blog = await Blog.find({})
      .sort({ createdAt: -1 })
      .populate("categories", ["_id", "name", "slug"])
      .populate("tags", ["_id", "name", "slug"])
      .populate("postedBy", ["_id", "name", "username"])
      .select("-photo -body");
    res.json(blog);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Get Blogs, Categories, Tags, size
exports.listAllBlogsCategoriesTags = async (req, res) => {
  try {
    let limit = req.body.limit ? parseInt(req.body.limit) : 10;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    let blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .populate("categories", ["_id", "name", "slug"])
      .populate("tags", ["_id", "name", "slug"])
      .populate("postedBy", ["_id", "name", "username", "profile"])
      .select("-photo -body")
      .skip(skip)
      .limit(limit);

    let categories = await Category.find({});
    let tags = await Tag.find({});

    res.json({ blogs, categories, tags, size: blogs.length });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Get Single Blog by slug
exports.read = async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase();
    const blog = await Blog.findOne({ slug })
      .populate("categories", ["_id", "name", "slug"])
      .populate("tags", ["_id", "name", "slug"])
      .populate("postedBy", ["_id", "name", "username"])
      .select("-photo -excerpt");

    if (!blog) return res.status(404).json({ message: `Blog doesn't Exist` });

    res.json(blog);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Blog Delete
exports.remove = async (req, res) => {
  try {
    let slug = req.params.slug.toLowerCase();
    const blog = await Blog.findOneAndRemove({ slug });

    if (!blog) return res.status(404).json({ message: "Blog is not exist" });

    res.json({
      message: "Blog Deleted Successfully"
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Blog Update
// exports.update = async (req, res) => {
//   const slug = req.params.slug.toLowerCase();
//   try {
//     let blog = await Blog.findOne({ slug });

//     let form = new formidable.IncomingForm();
//     form.keepExtension = true;

//     form.parse(req, (err, fields, files) => {
//       if (err)
//         return res.status(400).json({
//           error: "Image could not upload"
//         });
//     });

//     let slugBeforeMerge = oldBlog.slug;
//     oldBlog = _.merge(oldBlog, fields);
//     oldBlog.slug = slugBeforeMerge;

//     const { body, metaDesc, categories, tags } = fields;

//     if (body) {
//       oldBlog.excerpt = smartTrim(body, 320, " ", " ...");
//       oldBlog.metaDesc = stripHtml(body.substring(0, 160));
//     }

//     if (categories) {
//       oldBlog.categories = categories.split(",");
//     }

//     if (tags) {
//       oldBlogs.tags = tags.split(",");
//     }

//     if (files.photo) {
//       if (files.photo.size > 10000000) {
//         return res
//           .status(400)
//           .json({ error: "Image should be less than 1mb in size" });
//       }
//       oldBlog.photo.data = fs.readFileSync(files.photo.path);
//       oldBlog.photo.contentType = files.photo.type;
//     }

//     await oldBlog.save();

//     res.json(blog);
//   } catch (err) {
//     res.status(500).json("Server Error");
//   }
// };

exports.update = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Blog.findOne({ slug }).exec((err, oldBlog) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not upload"
        });
      }

      let slugBeforeMerge = oldBlog.slug;
      oldBlog = _.merge(oldBlog, fields);
      oldBlog.slug = slugBeforeMerge;

      const { body, metaDesc, categories, tags } = fields;

      if (body) {
        oldBlog.excerpt = smartTrim(body, 320, " ", " ...");
        oldBlog.metaDesc = stripHtml(body.substring(0, 160));
      }

      if (categories) {
        oldBlog.categories = categories.split(",");
      }

      if (tags) {
        oldBlog.tags = tags.split(",");
      }

      if (files.photo) {
        if (files.photo.size > 10000000) {
          return res.status(400).json({
            error: "Image should be less then 1mb in size"
          });
        }
        oldBlog.photo.data = fs.readFileSync(files.photo.path);
        oldBlog.photo.contentType = files.photo.type;
      }

      oldBlog.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: `Server Error`
          });
        }
        // result.photo = undefined;
        res.json(result);
      });
    });
  });
};
