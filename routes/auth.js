var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { signout, signup, signin, isSignedIn, isAuthenticated } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
    check("email", "email is required").isEmail(),
    check("phoneNumber", "phone number is required").isLength({ min: 10 }),
    check("password", "password should be atleast 3 characters").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({ min: 1 }),
  ],
  signin
);

router.get("/testroute", isSignedIn, isAuthenticated , (req, res) => {
  res.json(req.auth);
});

router.get("/signout", signout);

module.exports = router;
