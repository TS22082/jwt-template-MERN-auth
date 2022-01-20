const Post = require("../models/postModel");

module.exports = {
  newPost: (req, res) => {
    res.json({ msg: "new post success" });
  },

  getAllPosts: (req, res) => {
    res.json({ msg: "get all success" });
  },

  getSinglePost: (req, res) => {
    res.json({ msg: "get one success" });
  },

  editOnePost: (req, res) => {
    res.json({ msg: "edit one post success" });
  },

  deletePost: (req, res) => {
    res.json({ msg: "delete post success" });
  },
};
