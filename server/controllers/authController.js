//Get Admin Login Page
const getAdminLoginPage = async (req, res) => {
  res.render("loginadmin", {
    title: "Admin Login",
  });
};

//Get Admin SignUp Page
const getAdminSignUpPage = async (req, res) => {
  res.render("signupadmin", {
    title: "Admin Sign Up",
  });
};

const logOutAdmin = (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("/auth/admin/login");
  });
};

module.exports = { getAdminLoginPage, getAdminSignUpPage, logOutAdmin };
