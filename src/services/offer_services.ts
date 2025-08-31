import { OfferDTO, OfferItemResponse } from "dtos/offer_dto";
import { OfferRepository } from "../repositories/offer_repository";
import { off } from "process";

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
}