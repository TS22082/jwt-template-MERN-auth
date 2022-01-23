const Post = require("../models/postModel");

module.exports = {
  newPost: async (req, res) => {
    try {
      if (!req.body.text || !req.body.authorId)
        return res.status(500).json({ msg: "not all fields have been passed" });

      const newPost = new Post({
        text: req.body.text,
        authorId: req.body.authorId,
      });

      return res.json(await newPost.save());
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const allPosts = await Post.find({});
      return res.json(allPosts);
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  },

  getSinglePost: async (req, res) => {
    try {
      const postFound = await Post.findById(req.params.postId);
      return res.json(postFound);
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  },

  editOnePost: async (req, res) => {
    try {
      const postFound = await Post.findById(req.params.postId);

      if (req.user !== postFound.authorId) {
        return res.status(500).json({ msg: "Not authorized" });
      }

      postFound.text = req.body.text;

      return res.json(await postFound.save());
    } catch (err) {
      return res.status(500).msg({ msg: err });
    }
  },

  deletePost: async (req, res) => {
    try {
      const postFound = await Post.findById(req.params.postId);

      if (req.user !== postFound.authorId) {
        return res.status(500).json({ msg: "Not authorized" });
      }

      await Post.findByIdAndDelete(req.params.postId);

      return res.json({ msg: "successfully deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  },
};
