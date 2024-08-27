import { Router } from "express";
import {
  upload,
  checkAuthenticationAdmin,
  authPage,
} from "../middleware/middleware";
import adminController from "../controllers/admin.controller";
const router = Router();

router.route("/").get(checkAuthenticationAdmin, adminController.getAdminPanel);

router
  .route("/studioapartments")
  .get(authPage("ADMIN"), adminController.getStudioAdmin);
router
  .route("/singlerooms")
  .get(authPage("ADMIN"), adminController.getSingleAdmin);
router
  .route("/bedrooms")
  .get(authPage("ADMIN"), adminController.getBedroomAdmin);

router
  .route("/addproperty")
  .get(adminController.getAddPropertyPage)
  .post(upload.single("property_image"), adminController.addProperty);

router
  .route("/editproperty/:property_id")
  .get(adminController.getEditPropertyPage)
  .patch(adminController.editProperty);

router.route("/search-property").get(adminController.searchProperty);

router
  .route("/deleteproperty/:property_id")
  .delete(adminController.deleteProperty);

export default router;
