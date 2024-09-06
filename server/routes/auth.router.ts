import { Router } from "express";
import authController from "../controllers/auth.controller";
import passport from "passport";

const router = Router();

//Admin
router
  .route("/auth/admin/login")
  .get( authController.getAdminLoginPage)
  .post(
    passport.authenticate("login", {
      successRedirect: "/admin",
      failureRedirect: "/auth/admin/login",
    })
  );

router
  .route("/auth/admin/signup")
  .get(authController.getAdminSignUpPage)
  .post(
    passport.authenticate("signup-admin", {
      successRedirect: "/admin",
      failureRedirect: "/auth/admin/signup",
    })
  );

router.route("/logout").get(authController.logOutAdmin);

export default router;
