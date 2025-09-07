import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants/user_messages';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { buildFailed, buildSuccess } from '../utils/response_builder';
import { LocationServices } from '../services/location_services';

export class LocationController {
    private locationServices: LocationServices

    constructor() {
        this.locationServices = new LocationServices()
    }

    getCitiesWithRegions = async (req: Request, res: Response) => {
        try {
            const result = await this.locationServices.getCitiesWithRegions();

            if (result.error) {
                const response = buildFailed(ERROR_MESSAGES.GET_CITIES_BY_REGION, result.error);
                return res.status(400).json(response);
            }

            const response = buildSuccess(SUCCESS_MESSAGES.GET_CITIES_BY_REGION, result.data);
            res.status(200).json(response);
        } catch (error) {
            const response = buildFailed(ERROR_MESSAGES.GET_CITIES_BY_REGION, 'Internal server error');
            res.status(500).json(response);
        }
    };
}