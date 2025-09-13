import supabase from "../lib/supabaseClient";
import { GetPostByIdServiceResponse, GetPostItemServiceResponse, LocationDTO, PostDto, PostItemResponse, UpdatePostDTO, UpdatePostStatusDTO, UpdatePostSupabaseDTO } from "dtos/post_dto";
import { CityDTO, RegionDTO } from "dtos/location_dto";
import { toCamelCase, toSnakeCase } from "../utils/entity_transformer";
import { SellerDTO } from "dtos/user_dto";
import { startOfDay, endOfDay } from "date-fns";

export class PostRepository {
    async createPost(dto: PostDto): Promise<{ post: PostItemResponse; error?: any }> {
        let postSupabase = toSnakeCase(dto);
        const { data, error } = await supabase.from("posts").insert(
            postSupabase
        ).select();

        if (error) {
            return { post: null as any, error };
        }

        const postItem: PostItemResponse = toCamelCase<PostItemResponse>(data);

        return {
            post: postItem
        };
    }

    async getPostList(): Promise<{ response: GetPostItemServiceResponse }> {
        const { data, error } = await supabase
            .from("posts_with_details")
            .select("*");

        if (error) {
            const response: GetPostItemServiceResponse = {
                posts: [],
                error: error
            }
            return { response };
        }

        const postList: PostItemResponse[] = data.map(row => {
            const c = toCamelCase<any>(row);

            const city: CityDTO = {
                id: c.cityId,
                name: c.cityName
            }

            const region: RegionDTO = {
                id: c.regionId,
                name: c.regionName,
                city: city
            }

            const location: LocationDTO = {
                id: c.locationId,
                name: c.locationName,
                url: c.locationUrl,
                addressDescription: c.locationAddressDescription,
                region: region
            }

            const seller: SellerDTO = {
                id: c.sellerId,
                name: c.sellerName,
                email: c.sellerEmail,
                phone: c.sellerPhone
            }

            return {
                id: c.id,
                minPrice: c.minPrice,
                startDateTime: new Date(c.startDateTime),
                endDateTime: new Date(c.endDateTime),
                status: c.status,
                itemCount: c.itemCount,
                location: location,
                seller: seller,
                offerCount: c.offerCount,
                createdAt: new Date(c.createdAt),
                updatedAt: new Date(c.updatedAt),
                maxOfferPrice: c.maxOfferPrice,
                sportType: c.sportType,
                isBoosted: c.isBoosted
            } as unknown as PostItemResponse;
        });

        const response: GetPostItemServiceResponse = {
            posts: postList
        }
        return { response };
    }

    async getPostListByDate(date: Date): Promise<{ response: GetPostItemServiceResponse }> {
        const start = startOfDay(date).toISOString();
        const end = endOfDay(date).toISOString();

        const { data, error } = await supabase
            .from("posts_with_details")
            .select("*")
            .gte("start_date_time", start)
            .lt("start_date_time", end);

        console.log("getting post detail");
        if (error) {
            console.log(error);
            const response: GetPostItemServiceResponse = {
                posts: [],
                error: error
            }
            return { response };
        }

        const postList: PostItemResponse[] = data.map(row => {
            const c = toCamelCase<any>(row);

            const city: CityDTO = {
                id: c.cityId,
                name: c.cityName
            }

            const region: RegionDTO = {
                id: c.regionId,
                name: c.regionName,
                city: city
            }

            const location: LocationDTO = {
                id: c.locationId,
                name: c.locationName,
                url: c.locationUrl,
                addressDescription: c.locationAddressDescription,
                region: region
            }

            const seller: SellerDTO = {
                id: c.sellerId,
                name: c.sellerName,
                email: c.sellerEmail,
                phone: c.sellerPhone
            }

            return {
                id: c.id,
                minPrice: c.minPrice,
                startDateTime: new Date(c.startDateTime),
                endDateTime: new Date(c.endDateTime),
                status: c.status,
                itemCount: c.itemCount,
                location: location,
                seller: seller,
                offerCount: c.offerCount,
                createdAt: new Date(c.createdAt),
                updatedAt: new Date(c.updatedAt),
                maxOfferPrice: c.maxOfferPrice,
                sportType: c.sportType,
                isBoosted: c.isBoosted
            } as unknown as PostItemResponse;
        });

        const response: GetPostItemServiceResponse = {
            posts: postList
        }
        return { response };
    }

    async getDetailPost(postId: string): Promise<{ response: GetPostByIdServiceResponse }> {
        const { data, error } = await supabase
            .from("posts_with_details")
            .select("*")
            .eq("id", postId)
            .single();

        if (error) {
            const response: GetPostByIdServiceResponse = {
                error: error
            }
            return { response };
        }

        const postConverted = toCamelCase<any>(data);

        const city: CityDTO = {
            id: postConverted.cityId,
            name: postConverted.cityName
        }

        const region: RegionDTO = {
            id: postConverted.regionId,
            name: postConverted.regionName,
            city: city
        }

        const location: LocationDTO = {
            id: postConverted.locationId,
            name: postConverted.locationName,
            url: postConverted.locationUrl,
            addressDescription: postConverted.locationAddressDescription,
            region: region
        }

        const seller: SellerDTO = {
            id: postConverted.sellerId,
            name: postConverted.sellerName,
            email: postConverted.sellerEmail,
            phone: postConverted.sellerPhone
        }

        const postItem: PostItemResponse = {
            id: postConverted.id,
            minPrice: postConverted.minPrice,
            startDateTime: new Date(postConverted.startDateTime),
            endDateTime: new Date(postConverted.endDateTime),
            status: postConverted.status,
            itemCount: postConverted.itemCount,
            location: location,
            seller: seller,
            offerCount: postConverted.offerCount,
            createdAt: new Date(postConverted.createdAt),
            updatedAt: new Date(postConverted.updatedAt),
            maxOfferPrice: postConverted.maxOfferPrice,
            sportType: postConverted.sportType,
            isBoosted: postConverted.isBoosted
        }

        const response: GetPostByIdServiceResponse = {
            post: postItem
        }
        return { response };
    }

    async getMyPosts(userId: string): Promise<{ response: GetPostItemServiceResponse }> {
        const { data, error } = await supabase
            .from("posts_with_details")
            .select("*")
            .eq("seller_id", userId);

        if (error) {
            const response: GetPostItemServiceResponse = {
                posts: [],
                error: error
            }
            return { response };
        }

        const postList: PostItemResponse[] = data.map(row => {
            const c = toCamelCase<any>(row);

            const city: CityDTO = {
                id: c.cityId,
                name: c.cityName
            }

            const region: RegionDTO = {
                id: c.regionId,
                name: c.regionName,
                city: city
            }

            const location: LocationDTO = {
                id: c.locationId,
                name: c.locationName,
                url: c.locationUrl,
                addressDescription: c.locationAddressDescription,
                region: region
            }

            const seller: SellerDTO = {
                id: c.sellerId,
                name: c.sellerName,
                email: c.sellerEmail,
                phone: c.sellerPhone
            }

            return {
                id: c.id,
                minPrice: c.minPrice,
                startDateTime: new Date(c.startDateTime),
                endDateTime: new Date(c.endDateTime),
                status: c.status,
                itemCount: c.itemCount,
                location: location,
                seller: seller,
                offerCount: c.offerCount,
                createdAt: new Date(c.createdAt),
                updatedAt: new Date(c.updatedAt),
                maxOfferPrice: c.maxOfferPrice,
                sportType: c.sportType,
                isBoosted: c.isBoosted
            } as unknown as PostItemResponse;
        });

        const response: GetPostItemServiceResponse = {
            posts: postList
        }
        return { response };
    }

    async updatePost(dto: UpdatePostDTO): Promise<{ post: PostItemResponse; error?: any }> {
        let updatePostRequest: UpdatePostSupabaseDTO = {
            userId: dto.sellerId,
            locationId: dto.locationId,
            minPrice: dto.minPrice,
            itemCount: dto.itemCount,
            startDateTime: dto.startDateTime,
            endDateTime: dto.endDateTime,
            updatedAt: dto.updatedAt,
            sportType: dto.sportType
        }
        let postSupabase = toSnakeCase(updatePostRequest);

        const { data, error } = await supabase.from("posts").update(
            postSupabase
        )
            .eq("id", dto.id)
            .select();

        if (error) {
            return { post: null as any, error };
        }

        const postItem: PostItemResponse = toCamelCase<PostItemResponse>(data);

        return {
            post: postItem
        };
    }

    async updatePostStatus(dto: UpdatePostStatusDTO): Promise<{ post: PostItemResponse; error?: any }> {
        const { data, error } = await supabase.from("posts").update(
            {
                status: dto.status,
                updated_at: dto.updatedAt
            }
        )
            .eq("id", dto.id)
            .select();

        if (error) {
            return { post: null as any, error };
        }

        const postItem: PostItemResponse = toCamelCase<PostItemResponse>(data);

        return {
            post: postItem
        };
    }

    async deletePost(postId: string): Promise<{ error?: any }> {
        const { error } = await supabase.from("posts").delete().eq("id", postId);

        if (error) {
            return { error };
        }

        return {
        };
    }
}