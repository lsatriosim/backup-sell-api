import supabase from "../lib/supabaseClient";
import { GetPostItemServiceResponse, LocationDTO, PostDto, PostItemResponse, UpdatePostDTO, UpdatePostStatusDTO, UpdatePostSupabaseDTO } from "dtos/post_dto";
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
                id: c.cityId,
                name: c.cityName,
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
                id: c.cityId,
                name: c.cityName,
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
                id: c.cityId,
                name: c.cityName,
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