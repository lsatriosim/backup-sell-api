const express = require('express');
import { OfferController } from '../controllers/offer_controller';
import { verifyAdminToken } from '../middleware/authmiddleware';

const offerRoutes = express.Router();
const offerController = new OfferController();

offerRoutes.get('/:postId', verifyAdminToken, offerController.getOfferList);
offerRoutes.post('/create', verifyAdminToken, offerController.createOffer);
offerRoutes.post('/delete', verifyAdminToken, offerController.deleteOffer);
offerRoutes.post('/update', verifyAdminToken, offerController.updateOffer);

export default offerRoutes;