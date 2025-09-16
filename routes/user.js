const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { redirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

//signup
router.route("/signup").get((userController.renderSignupForm)).post(wrapAsync(userController.signup));

//login
router.route("/login").get((userController.renderLoginForm)).post(redirectUrl , passport.authenticate("local" , {failureRedirect : '/login' , failureFlash : true}) , (userController.login));

// logout
router.get("/logout", (userController.logout));

module.exports = router;
