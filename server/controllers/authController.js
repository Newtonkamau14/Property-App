const bcrypt = require("bcrypt");
const User = require("../models/user.model");

//Get Admin Login Page
exports.getAdminLoginPage = async (req, res) => {
  res.render("loginadmin", {
    title: "Admin Login",
  });
};

//Get Admin SignUp Page
exports.getAdminSignUpPage = async (req, res) => {
  res.render("signupadmin", {
    title: "Admin Sign Up",
  });
};

//SignUp new admin
exports.createAdmin = async (req, res) => {
  let user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  user = await user.save();
  req.flash('success','Accounted created successfully')
  res.redirect("/auth/admin/login");
};

//Change admin password
exports.changeAdminPassword = async (req, res) => {
  let user;


  try {
    user = await User.findById(req.params.id);
    user.password
  } catch (error) {
    
  }
};
