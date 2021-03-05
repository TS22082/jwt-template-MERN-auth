const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getUser,
  register,
  login,
  remove,
} = require("../controllers/UserController");

// register an account
router.post("/register", register);

// login user
router.post("/login", login);

// delete a user
router.delete("/delete", auth, remove);

// get current user
router.get("/", auth, getUser);

module.exports = router;
