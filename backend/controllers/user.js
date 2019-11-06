const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");
const { errorHandler } = require("../helpers/dbErrorHandler");

// import Models
const User = require("../models/user");
const Blog = require("../models/blog");

// Give user information or user profile
exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};

// Get Public Profile
exports.publicProfile = async (req, res) => {
  try {
    let username = req.params.username;
    let user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "User not found" });

    let userId = user._id;

    let blogs = await Blog.find({ postedBy: userId })
      .populate("categories", "_id name slug")
      .populate("tags", "_id name slug")
      .populate("postedBy", "_id name")
      .limit(10)
      .select("-photo");

    user.photo = undefined;
    user.hashed_password = undefined;
    user.salt = undefined;

    res.json({ user, blogs: blogs });
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtension = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Photo Could not be uploaded" });
    }

    // Save User
    let user = req.profile;
    user = _.extend(user, fields);

    if (files.photo) {
      if (files.photo.size > 100000) {
        return res.status(400).json({
          error: "Image should be less than 1mb"
        });
      }
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      user.hashed_password = undefined;
      res.json(user);
    });
  });
};

exports.photo = async (req, res) => {
  try {
    const username = req.params.username;
    let user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not Found" });

    if (user.photo.data) {
      res.set("Content-Type", user.photo.contentType);
      return res.send(user.photo.data);
    }
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};

// exports.publicProfile = (req, res) => {
//   let username = req.params.username;
//   let user;
//   let blogs;

//   User.findOne({ username }).exec((err, userFromDB) => {
//     if (err || !userFromDB) {
//       return res.status(400).json({
//         error: "User not found"
//       });
//     }
//     user = userFromDB;
//     let userId = user._id;
//     Blog.find({ postedBy: userId })
//       .populate("categories", "_id name slug")
//       .populate("tags", "_id name slug")
//       .populate("postedBy", "_id name")
//       .limit(10)
//       .select(
//         "_id title slug excerpt categories tags postedBy createdAt updatedAt"
//       )
//       .exec((err, data) => {
//         if (err) {
//           return res.status(400).json({
//             error: errorHandler(err)
//           });
//         }
//         user.photo = undefined;
//         res.json({
//           user,
//           blogs: data
//         });
//       });
//   });
// };
