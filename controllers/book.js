const Author = require("../models/author");
const Book = require("../models/book");

exports.getAllBooks = async (req, res) => {
  await Book.find()
    .select("title")
    .select("author")
    .select("likes")
    .select("numberOfLikes")
    .exec((err, books) => {
      page = req.query.page ? req.query.page : 1;
      limit = req.query.limit ? req.query.limit : 5;
      sort = req.query.sort ? req.query.sort : "desc";
      if (err || !books) {
        return res.status(400).json({
          error: "No books found",
        });
      }
      books = books.slice((page - 1) * limit, page * limit);
      // desc sort
      books.sort((a, b) => {
        if (a.numberOfLikes > b.numberOfLikes) {
          return -1;
        }
        return 1;
      });

      if (sort == "asc") {
        books.reverse();
      }

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
  await Author.findByIdAndUpdate(
    req.auth._id,
    {
      $addToSet: { likes: req.book._id },
    },
    { new: true }
  ).exec((err, author) => {
    if (err || !author) {
      return res.status(400).json({
        error: "No author found",
      });
    }
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
  await Author.findByIdAndUpdate(
    req.auth._id,
    {
      $pull: { likes: req.book._id },
    },
    { new: true }
  ).exec((err, author) => {
    if (err || !author) {
      return res.status(400).json({
        error: "No author found",
      });
    }
  });
};
