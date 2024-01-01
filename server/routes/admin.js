const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
require("../../config/passport");
const { upload, checkAuthenticationAdmin,authPage } = require("../../middleware/middleware");

router.route("/").get(authPage('ADMIN'),adminController.getAdminPanel);

router.route("/studioapartments").get(authPage('ADMIN'),adminController.getStudioAdmin);
router.route("/singlerooms").get(adminController.getSingleAdmin);
router.route("/bedrooms").get(adminController.getBedroomAdmin);

router
  .route("/addproperty")
  .get(adminController.getAddPropertyPage)
  .post(upload.single("property_image"), adminController.addProperty);

router
  .route("/editproperty/:property_id")
  .get(adminController.getEditPropertyPage)
  .post(adminController.editProperty);

router.route("/search-property").get(adminController.searchProperty);

router
  .route("/deleteproperty/:property_id")
  .delete(adminController.deleteProperty);

module.exports = router;
