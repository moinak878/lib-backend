// GET /authors/me: To return the details of the logged-in author.
const express = require("express");
const router = express.Router();
const {
  getUserById,
  getUser,
  updateUser,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

// GET /authors: To return the response of all the authors in the database with number of books published by that author
router.get("/authors", isSignedIn , getAllAuthors);


router.param("userId", getUserById);
// GET /authors/:id: To return the details of the author with the given author id with list of books.
router.get("/authors/:authorId", isSignedIn, getUser);

router.put("/authors/me", isSignedIn, isAuthenticated, updateUser);


module.exports = router;
