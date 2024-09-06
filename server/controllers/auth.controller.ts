import { Request, Response } from "express";

//Get Admin Login Page
const getAdminLoginPage = async (req: Request, res: Response) => {
  res.render("loginadmin", {
    title: "Admin Login",
  });
};

//Get Admin SignUp Page
const getAdminSignUpPage = async (req: Request, res: Response) => {
  res.render("signupadmin", {
    title: "Admin Sign Up",
  });
};

const logOutAdmin = (req: Request, res: Response) => {
  req.session.destroy(function (err) {
    res.redirect("/auth/admin/login");
  });
};

export default { getAdminLoginPage, getAdminSignUpPage, logOutAdmin };
