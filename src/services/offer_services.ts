import { OfferDTO, OfferItemResponse, OfferUpdateDTO } from "dtos/offer_dto";
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
                console.log(response.error);
                return { success: false, error: 'Failed to get offer list' };
            }

            return {
                success: true,
                data: response.offers,
            };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                error: 'Failed to get offer list'
            };
        }
    }

    async createOffer(offerDTO: OfferDTO): Promise<{
        success: boolean;
        error?: string;
        data?: OfferItemResponse;
    }> {
        try {
            const { offer, error } = await this.offerRepository.createOffer(offerDTO);
            if (error) {
                console.log(error);
                return { success: false, error: 'Failed to create offer' };
            }

            return {
                success: true,
                data: offer,
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to create offer'
            };
        }
    }

    async updateOffer(offerDTO: OfferUpdateDTO): Promise<{
        success: boolean;
        error?: string;
        data?: OfferItemResponse;
    }> {
        try {
            const { offer, error } = await this.offerRepository.updateOffer(offerDTO);
            if (error) {
                console.log(error);
                return { success: false, error: 'Failed to update offer' };
            }

            return {
                success: true,
                data: offer,
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to update offer'
            };
        }
    }

    async deleteOffer(offerId: string): Promise<{
        success: boolean;
        error?: string;
    }> {
        try {
            const { error } = await this.offerRepository.deleteOffer(offerId);
            if (error) {
                console.log(error);
                return { success: false, error: 'Failed to delete offer' };
            }

            return {
                success: true
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to delete offer'
            };
        }
    }
}