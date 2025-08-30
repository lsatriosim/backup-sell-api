import { TimeStamp } from "./response_dto";
import { UserProfileDto } from "./user_dto";

export interface OfferDTO {
    postId: string; //Foreign key to Post
    price: string;
}

export interface OfferItemResponse extends OfferDTO, TimeStamp {
    id: string;
    buyer: UserProfileDto;
}

// ============== Offer Service Response ==============

export interface GetOfferItemServiceResponse {
    offers: OfferItemResponse[];
    error?: any;
}