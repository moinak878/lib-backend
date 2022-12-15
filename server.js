const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routes
const authRoutes = require("./routes/auth");
const authorRoutes = require("./routes/author");
// const bookRoutes = require("./routes/book");

app.use("/", authRoutes);
app.use("/authors", authorRoutes);
// app.use("/", bookRoutes);

// DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

// server
app.listen(8000, () => {
  console.log("Server is running on port 3000");
});
