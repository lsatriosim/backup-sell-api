import { UserProfileDto } from "./user_dto";
import { TimeStamp } from "./response_dto";
import { RegionDTO } from "./location_dto";

export interface LocationDTO {
    id: string;
    name: string;
    url: string;
    addressDescription: string;
    region: RegionDTO; //Foreign key to Region
}

export interface PostDto {
    userId: string; //Foreign key to user
    locationId: string; //Foreign key to Location
    minPrice: number;
    itemCount: number;
    startDateTime: Date;
    endDateTime: Date;
    sportType: string;
}

export interface UpdatePostSupabaseDTO extends PostDto {
    updatedAt: Date;
}

export interface UpdatePostDTO {
    id: string;
    sellerId: string;
    locationId: string; //Foreign key to Location
    minPrice: number;
    itemCount: number;
    startDateTime: Date;
    endDateTime: Date;
    updatedAt: Date;
    sportType: string;
}

export interface UpdatePostStatusDTO {
    id: string;
    sellerId: string;
    status: string;
    updatedAt: Date;
}

export interface PostItemResponse extends PostDto, TimeStamp  {
    id: string;
    status: string;
    location: LocationDTO;
    seller: UserProfileDto;
    offerCount: number;
    maxOfferPrice: number;
    isBoosted: boolean;
}

// ============== POST Service ==============

export interface GetPostItemServiceResponse {
    posts: PostItemResponse[];
    error?: any;
}