import supabase from "../lib/supabaseClient";
import { CityDTO, GetPostItemServiceResponse, LocationDTO, PostDto, PostItemResponse, RegionDTO, UpdatePostDTO, UpdatePostStatusDTO, UpdatePostSupabaseDTO } from "dtos/post_dto";
import { toCamelCase, toSnakeCase } from "../utils/entity_transformer";
import { UserProfileDto } from "dtos/user_dto";

export class PostRepository {
    async createPost(dto: PostDto): Promise<{ post: PostItemResponse; error?: any }> {
        let postSupabase = toSnakeCase(dto);
        const { data, error } = await supabase.from("posts").insert(
            [
                postSupabase
            ]
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
                name: c.name,
                url: c.locationUrl,
                addressDescription: c.addressDescription,
                region: region
            }

            const seller: UserProfileDto = {
                userId: c.sellerId,
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
                location: location,
                seller: seller,
                offerCount: c.offerCount,
                createdAt: new Date(c.createdAt),
                updatedAt: new Date(c.updatedAt),
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
                name: c.name,
                url: c.locationUrl,
                addressDescription: c.addressDescription,
                region: region
            }

            const seller: UserProfileDto = {
                userId: c.sellerId,
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
                location: location,
                seller: seller,
                offerCount: c.offerCount,
                createdAt: new Date(c.createdAt),
                updatedAt: new Date(c.updatedAt),
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
            startDateTime: dto.startDateTime,
            endDateTime: dto.endDateTime,
            updatedAt: dto.updatedAt
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
                status: dto.status
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