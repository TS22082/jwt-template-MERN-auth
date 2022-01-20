const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;

// setup express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/jwt-auth",
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// setup routes
app.use("/users", require("./routes/userRoutes"));
app.use("/posts", require("./routes/postRoutes"));

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`));
