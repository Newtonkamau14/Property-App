import { Router } from "express";
import propertyController from "../controllers/property.controller";


const router = Router();

router.route('/').get(propertyController.getHomePage);

router.route('/bedrooms').get(propertyController.getBedrooms);

router.route('/singlerooms').get(propertyController.getSingleRoom);

router.route('/studioapartments').get(propertyController.getStudioApartment);

router.route('/showproperty/:property_id').get(propertyController.showProperty);

router.route('/search-property').get(propertyController.userSearchProperty);




export default router;