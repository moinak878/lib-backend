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
const bookRoutes = require("./routes/book");

app.use("/", authRoutes);
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

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

const port  = process.env.PORT || 8000;
// server
app.listen(port, () => {
  console.log("Server is running on port 3000");
});

// const Book = require("./models/book");
// const { faker } = require("@faker-js/faker");

// for (let i = 0; i < 5; i++) {
//   const title = faker.name
//     .firstName()
//     .concat(" ", faker.vehicle.fuel());
//   const book = new Book({
//     title: title,
//     author: "639ab81cee1d682c5efe069c",
//   });
//   book.save((err, book) => {
//     if (err) {
//       return res.status(400).json({
//         err: "Not able to save book in db ",
//       });
//     }
//   });
// }
