import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants/user_messages';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { OfferServices } from "../services/offer_services";
import { buildFailed, buildSuccess } from '../utils/response_builder';

export class OfferController {
    private offerServices: OfferServices

    constructor() {
        this.offerServices = new OfferServices()
    }

    getOfferList = async (req: Request, res: Response) => {
        try {
            const result = await this.offerServices.getOffers(req.body.postId);

            if (result.error) {
                console.log(result.error);
                const response = buildFailed(ERROR_MESSAGES.GET_OFFER_LIST, result.error);
                return res.status(400).json(response);
            }

            const response = buildSuccess(SUCCESS_MESSAGES.GET_OFFER_LIST, result.data);
            res.status(200).json(response);
        } catch (error) {
            console.log("internal server error");
            const response = buildFailed(ERROR_MESSAGES.GET_OFFER_LIST, 'Internal server error');
            res.status(500).json(response);
        }
    };
}