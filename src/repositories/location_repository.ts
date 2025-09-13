import { GetOfferItemServiceResponse, OfferDTO, OfferItemResponse, OfferUpdateDTO } from "dtos/offer_dto";
import supabase from "../lib/supabaseClient";
import { toCamelCase, toSnakeCase } from "../utils/entity_transformer";
import { UserProfileDto } from "dtos/user_dto";

export class LocationRepository {
    async getCitiesWithRegions() {
        const { data, error } = await supabase
            .from("cities")
            .select(`
      id,
      name,
      regions (
        id,
        name
      )
    `);

        if (error) {
            return { cities: [], error };
        }

        return { cities: data };
    }

    async getLocationList() {
        const { data, error } = await supabase
            .from("locations")
            .select(`id, name, address_description`);

        const convertedData = toCamelCase(data);

        if (error) {
            return { locations: [], error };
        }

        return { locations: convertedData };
    }
}