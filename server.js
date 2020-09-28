const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// setup express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// setup routes
app.use("/users", require("./routes/userRoutes"));

// setup mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/jwt-auth",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// setup routes

app.use("/users", require("./routes/userRoutes"));

app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`));
