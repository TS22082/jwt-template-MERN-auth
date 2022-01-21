const Post = require("../models/postModel");

module.exports = {
  newPost: async (req, res) => {
    try {
      if (!req.body.text || !req.body.authorId)
        res.status(500).json({ msg: "not all fields have been passed" });

      const newPost = new Post({
        text: req.body.text,
        authorId: req.body.authorId,
      });

      res.json(await newPost.save());
    } catch (err) {
      res.status(500).json({ msg: err });
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const allPosts = await Post.find({});
      res.json(allPosts);
    } catch (err) {
      res.status(500).json({ msg: err });
    }
  },

  getSinglePost: async (req, res) => {
    try {
      const postFound = await Post.findById(req.params.postId);
      res.json(postFound);
    } catch (err) {
      res.status(500).json({ msg: err });
    }
  },

  editOnePost: async (req, res) => {
    try {
      const postFound = await Post.findById(req.params.postId);

      console.log("user ID ==>", req.user);
      console.log("post from id ===>", postFound.authorId);

      if (req.user !== postFound.authorId) {
        res.status(500).json({ msg: "Not authorized" });
      }

      postFound.text = req.body.text;

      res.json(await postFound.save());
    } catch (err) {
      res.status(500).msg({ msg: err });
    }
  },

  deletePost: (req, res) => {
    res.json({ msg: "delete post success" });
  },
};
