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
                const response = buildFailed(ERROR_MESSAGES.GET_OFFER_LIST, result.error);
                return res.status(400).json(response);
            }

            const response = buildSuccess(SUCCESS_MESSAGES.GET_OFFER_LIST, result.data);
            res.status(200).json(response);
        } catch (error) {
            const response = buildFailed(ERROR_MESSAGES.GET_OFFER_LIST, 'Internal server error');
            res.status(500).json(response);
        }
    };

    createOffer = async (req: Request, res: Response) => {
        try {
            const requestBody = req.body;
            const token = req.cookies.token;
            const payload = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload & { id: string; email: string };
            const userId = payload.id;
            const offerDTO = { ...requestBody, userId }
            const result = await this.offerServices.createOffer(offerDTO);

            if (result.error) {
                const response = buildFailed(ERROR_MESSAGES.CREATE_OFFER, result.error);
                return res.status(400).json(response);
            }

            const response = buildSuccess(SUCCESS_MESSAGES.CREATE_OFFER, result.data);
            res.status(200).json(response);
        } catch (error) {
            const response = buildFailed(ERROR_MESSAGES.CREATE_OFFER, 'Internal server error');
            res.status(500).json(response);
        }
    };

    updateOffer = async (req: Request, res: Response) => {
        try {
            const requestBody = req.body;
            const token = req.cookies.token;
            const payload = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload & { id: string; email: string };
            const userId = payload.id;
            if (requestBody.userId != userId) {
                const response = buildFailed(ERROR_MESSAGES.UNAUTHORIZED, 'Unauthorized Access');
                res.status(403).json(response);
            }
            const updatedAt = new Date().toISOString();
            const offerDTO = { ...requestBody, updatedAt}
            const result = await this.offerServices.updateOffer(offerDTO);

            if (result.error) {
                const response = buildFailed(ERROR_MESSAGES.UPDATE_OFFER, result.error);
                return res.status(400).json(response);
            }

            const response = buildSuccess(SUCCESS_MESSAGES.UPDATE_OFFER, result.data);
            res.status(200).json(response);
        } catch (error) {
            const response = buildFailed(ERROR_MESSAGES.UPDATE_OFFER, 'Internal server error');
            res.status(500).json(response);
        }
    };

    deleteOffer = async (req: Request, res: Response) => {
            try {
                const requestBody = req.body;
                const token = req.cookies.token;
                const payload = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload & { id: string; email: string };
                const userId = payload.id;
                
                if (requestBody.userId != userId) {
                    const response = buildFailed(ERROR_MESSAGES.UNAUTHORIZED, 'Unauthorized Access');
                    res.status(403).json(response);
                }
    
                const offerId  = requestBody.id
                const result = await this.offerServices.deleteOffer(offerId);
    
                if (result.error) {
                    const response = buildFailed(ERROR_MESSAGES.DELETE_OFFER, result.error);
                    return res.status(400).json(response);
                }
    
                const response = buildSuccess(SUCCESS_MESSAGES.DELETE_OFFER);
                res.status(200).json(response);
            } catch (error) {
                const response = buildFailed(ERROR_MESSAGES.DELETE_OFFER, 'Internal server error');
                res.status(500).json(response);
            }
        };
}