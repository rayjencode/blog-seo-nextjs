const Tags = require("../models/tag");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbErrorHandler");

// Create Tags
exports.create = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let tags = new Tags({ name, slug });

  tags.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};

// Get All Tags
exports.list = (req, res) => {
  Tags.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};

// Get single Tags buy slig
exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Tags.findOne({ slug }).exec((err, tag) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }

    if (!tag) {
      return res.status(404).json({
        message: "404 Tags not found"
      });
    }
    res.json(tag);
  });
};

// Remove Tags
exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tags.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      message: "Tag deleted successfully"
    });
  });
};
