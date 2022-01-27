const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  strict: false,
});

module.exports = Post = mongoose.model("Post", postSchema);
