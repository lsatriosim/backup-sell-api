const express = require('express');
import { OfferController } from '../controllers/offer_controller';
import { verifyAdminToken } from '../middleware/authmiddleware';

const offerRoutes = express.Router();
const offerController = new OfferController();

offerRoutes.get('/list', verifyAdminToken, offerController.getOfferList);
offerRoutes.post('/create', verifyAdminToken, offerController.createOffer);
offerRoutes.post('/delete', verifyAdminToken, offerController.deleteOffer);

export default offerRoutes;