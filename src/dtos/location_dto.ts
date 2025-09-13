export interface CityDTO {
    id: string;
    name: string;
}

export interface RegionDTO {
    id: string;
    city: CityDTO; //Foreign key to City
    name: string;
}

export interface Region {
    id: string;
    name: string;
}

export interface LocationListItemResponse {
    id: string;
    name: string;
    addressDescription: string;
}

export interface CityRegionFilterOption {
    id: string;
    name: string;
    regions: Region[];
}