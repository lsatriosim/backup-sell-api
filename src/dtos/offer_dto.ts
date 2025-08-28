export interface OfferDTO {
    postId: string; //Foreign key to Post
    userId: string; //Foreign key to User
    price: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface OfferItemDTO extends OfferDTO {
    id: string;
}