import { GetOfferItemServiceResponse, OfferDTO, OfferItemResponse } from "dtos/offer_dto";
import supabase from "../lib/supabaseClient";
import { toCamelCase, toSnakeCase } from "../utils/entity_transformer";
import { UserProfileDto } from "dtos/user_dto";

export class OfferRepository {
    async getOfferList(postId: string): Promise<{ response: GetOfferItemServiceResponse }> {
        const { data, error } = await supabase
            .from("offers_with_details")
            .select("*")
            .eq("post_id", postId);

        if (error) {
            console.log(error);
            const response: GetOfferItemServiceResponse = {
                offers: [],
                error: error
            }
            return { response };
        }

        const offerList: OfferItemResponse[] = data.map(row => {
            const c = toCamelCase<any>(row);

            const buyer: UserProfileDto = {
                userId: c.buyerId,
                name: c.buyerName,
                email: c.buyerEmail,
                phone: c.buyerPhone
            }

            return {
                id: c.id,
                postId: c.postId,
                price: c.price,
                buyer: buyer,
                createdAt: new Date(c.createdAt),
                updatedAt: new Date(c.updatedAt),
            } as unknown as OfferItemResponse;
        });

        const response: GetOfferItemServiceResponse = {
            offers: offerList
        }
        return { response };
    }

    async createOffer(dto: OfferDTO): Promise<{ offer: OfferItemResponse; error?: any }> {
        let offerSupabase = toSnakeCase(dto);
        const { data, error } = await supabase.from("offers").insert(
            offerSupabase
        ).select();

        if (error) {
            return { offer: null as any, error };
        }

        const offerItem: OfferItemResponse = toCamelCase<OfferItemResponse>(data);

        return {
            offer: offerItem
        };
    }

    async deleteOffer(offerId: string): Promise<{ error?: any }> {
        const { error } = await supabase.from("offers").delete().eq("id", offerId);

        if (error) {
            return { error };
        }

        return {
        };
    }
}