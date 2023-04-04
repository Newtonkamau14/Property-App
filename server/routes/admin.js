const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const adminController = require("../controllers/adminController");
require("../../config/passport.config");


const storage = multer.diskStorage({
  //Destination for files
  destination: function(req,file,callback){
      callback(null,'./uploads')
  },

  //add back the extension
  filename: function(req,file,callback) {
      callback(null,file.fieldname + "_" + Date.now() + "_" + file.originalname)
  }
});


//upload parameters
const upload = multer({
  storage: storage,
});


//Check user is authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/auth/admin/login");
}

router.route("/admin").get(checkAuthenticated, adminController.getAdminPanel);

router.route("/admin/studioapartments").get(adminController.getStudioAdmin);
router.route("/admin/singlerooms").get(adminController.getSingleAdmin);
router.route("/admin/bedrooms").get(adminController.getBedroomAdmin);

router
  .route("/admin/addproperty")
  .get(adminController.getAddPropertyPage)
  .post(upload.single("property_image"), adminController.addProperty);

router
  .route("/admin/editproperty/:id")
  .get(adminController.getEditPropertyPage)
  .post(adminController.editProperty);

router.route("/admin/search-property").get(adminController.searchProperty);

router
  .route("/admin/deleteproperty/:id")
  .delete(adminController.deleteProperty);

module.exports = router;
