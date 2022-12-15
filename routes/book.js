const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  likeBook,
  unlikeBook,
} = require("../controllers/book");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

// GET /books : To return the list of all the books.
// (In this endpoint the data should be paginated and there must be some sorting parameters to fetch the list in order of most likes or least likes.)
router.get("/", isSignedIn, getAllBooks);

// params
router.param("bookId", getBookById);

// PUT /books/like/:id: To like a book.
router.put("/like/:bookId", isSignedIn, likeBook);

// PUT /books/unlike/:id: To, unlike a book.
router.put("/unlike/:bookId", isSignedIn, unlikeBook);

module.exports = router;
