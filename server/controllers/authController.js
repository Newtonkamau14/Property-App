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


exports.logOutAdmin = (req,res) => {
  req.session.destroy(function(err){
    res.redirect("/auth/admin/login")
  })
}