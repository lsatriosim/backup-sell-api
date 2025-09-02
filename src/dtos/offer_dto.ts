import { TimeStamp } from "./response_dto";
import { UserProfileDto } from "./user_dto";

export interface OfferDTO {
    postId: string; //Foreign key to Post
    price: string;
    itemCount: number;
}

export interface OfferItemResponse extends OfferDTO, TimeStamp {
    id: string;
    buyer: UserProfileDto;
}

export interface OfferUpdateDTO extends OfferDTO {
    id: string;
    userId: string;
    updatedAt: Date;
}

// ============== Offer Service Response ==============

export interface GetOfferItemServiceResponse {
    offers: OfferItemResponse[];
    error?: any;
}