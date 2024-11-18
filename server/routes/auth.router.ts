import { Router } from "express";
import authController from "../controllers/auth.controller";

const router = Router();

//Admin
router.route("/admin/login").post(authController.loginAdmin);

router.route("/admin/signup").post(authController.signUpAdmin);

router.route("/logout").get(authController.logOutAdmin);

export default router;
