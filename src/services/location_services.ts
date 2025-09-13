import { LocationRepository } from "../repositories/location_repository";
import { CityRegionFilterOption, LocationListItemResponse } from "dtos/location_dto";

export class LocationServices {
    private locationRepository: LocationRepository

    constructor() {
        this.locationRepository = new LocationRepository()
    }

    async getCitiesWithRegions(): Promise<{
        success: boolean;
        error?: string;
        data?: CityRegionFilterOption[];
    }> {
        try {
            const { cities, error } = await this.locationRepository.getCitiesWithRegions();
            if (error) {
                return { success: false, error: 'Failed to get Cities with Regions' };
            }

            return {
                success: true,
                data: cities,
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to get cities with regions'
            };
        }
    }


    async getLocationList(): Promise<{
        success: boolean;
        error?: string;
        data?: LocationListItemResponse[];
    }> {
        try {
            const { locations, error } = await this.locationRepository.getLocationList();
            if (error) {
                return { success: false, error: 'Failed to get Locations' };
            }

            return {
                success: true,
                data: locations as LocationListItemResponse[],
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to get Locations'
            };
        }
    }
}