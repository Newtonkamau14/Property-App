const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");
const { checkNotAuthenticatedAdmin } = require("../middleware/middleware");
require("../config/passport");


//Admin
router
  .route("/auth/admin/login")
  .get(checkNotAuthenticatedAdmin, authController.getAdminLoginPage)
  .post(
    checkNotAuthenticatedAdmin,
    passport.authenticate("login", {
      successRedirect: "/admin",
      failureRedirect: "/auth/admin/login",
    })
  );

router
  .route("/auth/admin/signup")
  .get(checkNotAuthenticatedAdmin, authController.getAdminSignUpPage)
  .post(
    passport.authenticate("signup-admin", {
      successRedirect: "/admin",
      failureRedirect: "/auth/admin/signup",
    })
  );

router.route("/logout").get(authController.logOutAdmin);

module.exports = router;
