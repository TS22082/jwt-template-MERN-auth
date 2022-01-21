const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  newPost,
  getAllPosts,
  getSinglePost,
  editOnePost,
  deletePost,
} = require("../controllers/PostController");

router.post("/", auth, newPost);
router.get("/all", auth, getAllPosts);
router.get("/one/:postId", auth, getSinglePost);
router.put("/:postId", auth, editOnePost);
router.delete("/:postId", auth, deletePost);

module.exports = router;
