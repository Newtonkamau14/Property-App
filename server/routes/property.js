const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');



router.route('/').get(propertyController.getHomePage);

router.route('/property/bedrooms').get(propertyController.getBedrooms);

router.route('/property/singlerooms').get(propertyController.getSingleRoom);

router.route('/property/studioapartments').get(propertyController.getStudioApartment);

router.route('/showproperty/:id').get(propertyController.showProperty);

router.route('search-property').get(propertyController.userSearchProperty);




module.exports = router;