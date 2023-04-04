const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");
require('../../config/passport.config');


function checkNotAuthenticated(req,res, next) {
  if(req.isAuthenticated()) {
      return res.redirect('/admin')
  }
  next()
}

//Admin
router
  .route('/auth/admin/login')
  .get(checkNotAuthenticated,authController.getAdminLoginPage)
  .post(
    checkNotAuthenticated,
    passport.authenticate('local', {
      successRedirect: '/admin',
      failureRedirect: '/auth/admin/login',
    }),
  );

router
  .route('/auth/admin/signup')
  .get(checkNotAuthenticated,authController.getAdminSignUpPage)
  .post(checkNotAuthenticated,authController.createAdmin);



module.exports = router;
