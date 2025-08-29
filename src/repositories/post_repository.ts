import supabase from "../lib/supabaseClient";
import { PostDto, PostItemResponse } from "dtos/post_dto";
import { toCamelCase, toSnakeCase } from "../utils/entity_transformer";

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
}