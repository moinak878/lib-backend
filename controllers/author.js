const { count } = require("../models/author");
const Author = require("../models/author");

exports.getAllAuthors = async (req, res) => {
  await Author.find()
    .select("name")
    .select("books")
    .exec((err, authors) => {
      if (err || !authors) {
        return res.status(400).json({
          error: "No authors found",
        });
      }
      res.json(authors);
    });
};

exports.getAuthorById = async (req, res, next, id) => {
  await Author.findById(id).exec((err, author) => {
    if (err || !author) {
      return res.status(400).json({
        error: "No author found",
      });
    }
    req.author = author;
    req.author.salt = undefined;
    req.author.password = undefined;
    req.author.createdAt = undefined;
    req.author.updatedAt = undefined;
    req.author.email = undefined;
    req.author.phoneNumber = undefined;
    next();
  });
};

exports.getAuthor = async (req, res) => {
  return res.json(req.author);
};

exports.getMe = async (req, res) => {
  await Author.findById(req.auth._id).exec((err, author) => {
    if (err || !author) {
      return res.status(400).json({
        error: "No author found",
      });
    }
    req.author = author;
    req.author.salt = undefined;
    req.author.password = undefined;
    req.author.createdAt = undefined;
    req.author.updatedAt = undefined;
    req.author.email = undefined;
    req.author.phoneNumber = undefined;
    return res.json(req.author);
  });
};
