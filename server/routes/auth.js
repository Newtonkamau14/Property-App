const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");
const { checkAuthenticationAdmin } = require("../../middleware/middleware");
require("../../config/passport");


//Admin
router
  .route("/auth/admin/login")
  .get(checkAuthenticationAdmin, authController.getAdminLoginPage)
  .post(
    checkAuthenticationAdmin,
    passport.authenticate("login", {
      successRedirect: "/admin",
      failureRedirect: "/auth/admin/login",
    })
  );

router
  .route("/auth/admin/signup")
  .get(checkAuthenticationAdmin, authController.getAdminSignUpPage)
  .post(
    passport.authenticate("signup-admin", {
      successRedirect: "/admin",
      failureRedirect: "/auth/admin/signup",
    })
  );

router.route("/logout").get(authController.logOutAdmin);

module.exports = router;
