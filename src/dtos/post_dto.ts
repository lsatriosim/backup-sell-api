import { StringValidation } from "zod";

export interface CityDTO {
    id: string;
    name: string;
}

export interface RegionDTO {
    id: string;
    cityId: string; //Foreign key to City
    name: string;
}

export interface LocationDTO {
    id: string;
    name: string;
    url: string;
    regionId: string; //Foreign key to Region
}

export interface PostDto {
    userId: string; //Foreign key to user
    locationId: string; //Foreign key to Location
    startDateTime: Date;
    endDateTime: Date;
}

export interface PostItemDto extends PostDto  {
    id: string;
}