const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  newPost,
  getAllPosts,
  getSinglePost,
  editOnePost,
  deletePost,
} = require("../controllers/PostController");

router.post("/", newPost);
router.get("/all", getAllPosts);
router.get("/one/:postId", getSinglePost);
router.put("/:postId", editOnePost);
router.delete("/:postId", deletePost);

module.exports = router;
