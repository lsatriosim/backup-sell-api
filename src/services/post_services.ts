import { CreatePostDto, PostDto, PostItemResponse, UpdatePostDTO, UpdatePostStatusDTO } from "dtos/post_dto";
import { PostRepository } from "../repositories/post_repository";

export class PostService {
    private postRepository: PostRepository;

    constructor() {
        this.postRepository = new PostRepository();
    }

    async createPost(postDto: CreatePostDto): Promise<{
        success: boolean;
        error?: string;
        data?: PostItemResponse;
    }> {
        try {
            const { post, error } = await this.postRepository.createPost(postDto);
            if (error) {
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

    async getPostListByDate(date: Date): Promise<{
        success: boolean;
        error?: string;
        data?: PostItemResponse[];
    }> {
        try {
            const { response } = await this.postRepository.getPostListByDate(date);
            if (response.error) {
                return { success: false, error: 'Failed to get post by date' };
            }

            return {
                success: true,
                data: response.posts,
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to get post by date'
            };
        }
    }

    async getMyPosts(userId: string): Promise<{
        success: boolean;
        error?: string;
        data?: PostItemResponse[];
    }> {
        try {
            const { response } = await this.postRepository.getMyPosts(userId);
            if (response.error) {
                return { success: false, error: 'Failed to get my post' };
            }

            return {
                success: true,
                data: response.posts,
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to get my post'
            };
        }
    }

    async getDetailPostById(postId: string): Promise<{
        success: boolean;
        error?: string;
        data?: PostItemResponse;
    }> {
        try {
            const { response } = await this.postRepository.getDetailPost(postId);
            if (response.error) {
                return { success: false, error: 'Failed to get post detail' };
            }

            return {
                success: true,
                data: response.post,
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to get post detail'
            };
        }
    }

    async updatePost(postDto: UpdatePostDTO): Promise<{
        success: boolean;
        error?: string;
        data?: PostItemResponse;
    }> {
        try {
            const { post, error } = await this.postRepository.updatePost(postDto);
            if (error) {
                return { success: false, error: 'Failed to update post' };
            }

            return {
                success: true,
                data: post,
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to update post'
            };
        }
    }

     async updatePostStatus(postDto: UpdatePostStatusDTO): Promise<{
        success: boolean;
        error?: string;
        data?: PostItemResponse;
    }> {
        try {
            const { post, error } = await this.postRepository.updatePostStatus(postDto);
            if (error) {
                return { success: false, error: 'Failed to update post' };
            }

            return {
                success: true,
                data: post,
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to update post'
            };
        }
    }

    async deletePost(postId: string): Promise<{
        success: boolean;
        error?: string;
    }> {
        try {
            const { error } = await this.postRepository.deletePost(postId);
            if (error) {
                return { success: false, error: 'Failed to delete post' };
            }

            return {
                success: true
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to delete post'
            };
        }
    }
}