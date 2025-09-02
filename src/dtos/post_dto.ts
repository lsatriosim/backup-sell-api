import { StringValidation } from "zod";
import { UserProfileDto } from "./user_dto";
import { TimeStamp } from "./response_dto";

export interface CityDTO {
    id: string;
    name: string;
}

export interface RegionDTO {
    id: string;
    city: CityDTO; //Foreign key to City
    name: string;
}

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
}

export interface UpdatePostStatusDTO {
    id: string;
    sellerId: string;
    status: string;
    itemCount: number;
    updatedAt: Date;
}

export interface PostItemResponse extends PostDto, TimeStamp  {
    id: string;
    minPrice: number;
    startDateTime: Date;
    endDateTime: Date;
    status: string;
    itemCount: number;
    location: LocationDTO;
    seller: UserProfileDto;
    offerCount: number;
}

// ============== POST Service ==============

export interface GetPostItemServiceResponse {
    posts: PostItemResponse[];
    error?: any;
}