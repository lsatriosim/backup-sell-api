import { LocationRepository } from "../repositories/location_repository";
import { CityRegionFilterOption } from "dtos/location_dto";

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
}