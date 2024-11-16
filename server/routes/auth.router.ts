import { Router } from "express";
import authController from "../controllers/auth.controller";
import { passport } from "../config/passport";

const router = Router();

//Admin
router.route("/admin/login").post(
  passport.authenticate("login", {
    successRedirect: "/admin",
    failureMessage: "Failed to signup"
  })
);

router.route("/admin/signup").post(
  passport.authenticate("signup-admin", {
    successRedirect: "/admin",
    failureMessage: "Failed to login"
  })
);

router.route("/logout").get(authController.logOutAdmin);

export default router;
