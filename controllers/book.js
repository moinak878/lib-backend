const Author = require("../models/author");
const Book = require("../models/book");

exports.getAllBooks = async (req, res) => {
  await Book.find().exec((err, books) => {
    page = req.query.page;
    limit = req.query.limit;
    if (err || !books) {
      return res.status(400).json({
        error: "No books found",
      });
    }
    books = books.slice((page - 1) * limit, page * limit);
    resultBooks = {
      prev: {
        page: page > 1 ? page - 1 : null,
      },
      next: {
        page: page < books.length ? page + 1 : null,
      },
      books,
    };
    res.json(resultBooks);
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
  await Book.findByIdAndUpdate(
    req.book._id,
    {
      $addToSet: { likes: req.auth._id },
    },
    { new: true }
  ).exec((err, book) => {
    if (err || !book) {
      return res.status(400).json({
        error: "No book found",
      });
    }
    res.json(book);
  });
};

exports.unlikeBook = async (req, res) => {
  await Book.findByIdAndUpdate(
    req.book._id,
    {
      $pull: { likes: req.auth._id },
    },
    { new: true }
  ).exec((err, book) => {
    if (err || !book) {
      return res.status(400).json({
        error: "No book found",
      });
    }
    res.json(book);
  });
};
