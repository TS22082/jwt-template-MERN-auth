const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Enter a valid email"],
  },
  password: { type: String, required: true, minLength: 5 },
  displayName: { type: String, required: true },
});

module.exports = User = mongoose.model("user", userSchema);
