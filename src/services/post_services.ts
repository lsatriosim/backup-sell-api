import { PostDto, PostItemResponse } from "dtos/post_dto";
import { PostRepository } from "../repositories/post_repository";

export class PostService {
    private postRepository: PostRepository;

    constructor() {
        this.postRepository = new PostRepository();
    }

    async createPost(postDto: PostDto): Promise<{
        success: boolean;
        error?: string;
        data?: PostItemResponse;
    }> {
        try {
            const { post, error } = await this.postRepository.createPost(postDto);
            if (error) {
                console.log(error);
                return { success: false, error: 'Failed to create post' };
            }

            return {
                success: true,
                data: post,
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to create post'
            };
        }
    }

    async getPostList(): Promise<{
        success: boolean;
        error?: string;
        data?: PostItemResponse[];
    }> {
        try {
            const { response } = await this.postRepository.getPostList();
            if (response.error) {
                console.log(response.error);
                return { success: false, error: 'Failed to create post' };
            }

            return {
                success: true,
                data: response.posts,
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to create post'
            };
        }
    }
}