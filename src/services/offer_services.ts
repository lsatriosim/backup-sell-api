import { OfferItemResponse } from "dtos/offer_dto";
import { OfferRepository } from "../repositories/offer_repository";

export class OfferServices {
    private offerRepository: OfferRepository

    constructor() {
        this.offerRepository = new OfferRepository()
    }

    async getOffers(postId: string): Promise<{
        success: boolean;
        error?: string;
        data?: OfferItemResponse[];
    }> {
        try {
            const { response } = await this.offerRepository.getOfferList(postId);
            if (response.error) {
                return { success: false, error: 'Failed to get offer list' };
            }

            return {
                success: true,
                data: response.offers,
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to get offer list'
            };
        }
    }
}