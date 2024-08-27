import { Router } from "express";
import adminRouter from "./admin.router.";
import authRouter from "./auth.router";
import propertyRouter from "./property.router";

const router = Router();

router.use("/admin", adminRouter);
router.use("/auth", authRouter);
router.use("/properties", propertyRouter);

export default router;
