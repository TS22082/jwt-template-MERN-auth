const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getUser,
  register,
  login,
  remove,
} = require("../controllers/UserController");

router.post("/register", register);
router.post("/login", login);
router.delete("/delete", auth, remove);
router.get("/", auth, getUser);

module.exports = router;
