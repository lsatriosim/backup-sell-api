const express = require('express');
import { LocationController } from '../controllers/location_controller';
import { verifyAdminToken } from '../middleware/authmiddleware';

const locationRoutes = express.Router();
const locationController = new LocationController();

locationRoutes.get('/get-cities-by-regions', verifyAdminToken, locationController.getCitiesWithRegions);
locationRoutes.get('/list', verifyAdminToken, locationController.getLocationList);

export default locationRoutes;