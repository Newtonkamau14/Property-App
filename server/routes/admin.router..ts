import { Router } from "express";
import { upload } from "../middleware/middleware";
import adminController from "../controllers/admin.controller";
const router = Router();

router.route("/").get(adminController.getAdminPanel);

router.route("/studioapartments").get(adminController.getStudioAdmin);
router.route("/singlerooms").get(adminController.getSingleAdmin);
router.route("/bedrooms").get(adminController.getBedroomAdmin);

router
  .route("/addproperty")
  .post(upload.single("property_image"), adminController.addProperty);

router.route("/editproperty/:property_id").patch(adminController.editProperty);

router.route("/search-property").get(adminController.searchProperty);

router
  .route("/deleteproperty/:property_id")
  .delete(adminController.deleteProperty);

export default router;
