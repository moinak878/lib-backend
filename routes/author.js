const express = require("express");
const router = express.Router();
const {
  getAllAuthors,
  getAuthor,
  getAuthorById,
  getMe,
} = require("../controllers/author");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

// GET /authors : To return the response of all the authors in the database with number of books published by that author
router.get("/", isSignedIn, getAllAuthors);
// // GET /authors/me: To return the details of the logged-in author.
router.get("/me", isSignedIn, getMe);
// GET /authors/:id: To return the details of the author with the given author id with list of books.
router.param("authorId", getAuthorById);
router.get("/:authorId", isSignedIn, getAuthor);

module.exports = router;
