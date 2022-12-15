const Author = require("../models/author");
const Book = require("../models/book");

exports.getAllBooks = async (req, res) => {
  await Book.find().exec((err, books) => {
    if (err || !books) {
      return res.status(400).json({
        error: "No books found",
      });
    }
    res.json(books);
  });
};

exports.getBookById = async (req, res, next, id) => {
  await Book.findById(id).exec((err, book) => {
    if (err || !book) {
      return res.status(400).json({
        error: "No book found",
      });
    }
    req.book = book;
    next();
  });
};

// exports.getAuthor = async (req, res) => {
//   return res.json(req.book);
// };

exports.likeBook = async (req, res) => {
  // unique not working for now
  await Book.findByIdAndUpdate(req.book._id, {
    $push: { likes: req.auth._id },
  }).exec((err, book) => {
    if (err || !book) {
      return res.status(400).json({
        error: "No book found",
      });
    }
    res.json(book);
  });
};

exports.unlikeBook = async (req, res) => {
  await Book.findByIdAndUpdate(req.book._id, {
    $pull: { likes: req.auth._id },
  }).exec((err, book) => {
    if (err || !book) {
      return res.status(400).json({
        error: "No book found",
      });
    }
    res.json(book);
  });
};
