import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PostService } from "../services/post_services";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants/user_messages';
import { buildFailed, buildSuccess } from '../utils/response_builder';
import { parse } from "date-fns";

export class PostController {
    private postService: PostService

    constructor() {
        this.postService = new PostService();
    }

    createPost = async (req: Request, res: Response) => {
        try {
            const requestBody = req.body;
            const token = req.cookies.token;
            const payload = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload & { id: string; email: string };
            const userId = payload.id;
            const status = "OPEN";
            const postDto = { ...requestBody, userId, status }
            const result = await this.postService.createPost(postDto);

            if (result.error) {
                const response = buildFailed(ERROR_MESSAGES.CREATE_POST, result.error);
                return res.status(400).json(response);
            }

            const response = buildSuccess(SUCCESS_MESSAGES.CREATE_POST, result.data);
            res.status(200).json(response);
        } catch (error) {
            const response = buildFailed(ERROR_MESSAGES.CREATE_POST, 'Internal server error');
            res.status(500).json(response);
        }
    };

    getPosts = async (req: Request, res: Response) => {
        try {
            const result = await this.postService.getPostList();

            if (result.error) {
                const response = buildFailed(ERROR_MESSAGES.GET_POST_LIST, result.error);
                return res.status(400).json(response);
            }

            const response = buildSuccess(SUCCESS_MESSAGES.GET_POST_LIST, result.data);
            res.status(200).json(response);
        } catch (error) {
            const response = buildFailed(ERROR_MESSAGES.GET_POST_LIST, 'Internal server error');
            res.status(500).json(response);
        }
    };

    getMyPosts = async (req: Request, res: Response) => {
        try {
            const token = req.cookies.token;
            const payload = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload & { id: string; email: string };
            const userId = payload.id;
            const result = await this.postService.getMyPosts(userId);

            if (result.error) {
                const response = buildFailed(ERROR_MESSAGES.GET_MY_POST, result.error);
                return res.status(400).json(response);
            }

            const response = buildSuccess(SUCCESS_MESSAGES.GET_MY_POST, result.data);
            res.status(200).json(response);
        } catch (error) {
            const response = buildFailed(ERROR_MESSAGES.GET_MY_POST, 'Internal server error');
            res.status(500).json(response);
        }
    };

    getPostByDate = async (req: Request, res: Response) => {
        try {
            const { date } = req.params;
            const parsedDate = parse(date, "dd-MM-yyyy", new Date());
            if (isNaN(parsedDate.getTime())) {
                const response = buildFailed(ERROR_MESSAGES.GET_MY_POST, "Invalid date format. Use dd-MM-yyyy.");
                return res.status(400).json(response);
            }

            const result = await this.postService.getPostListByDate(parsedDate);

            if (result.error) {
                const response = buildFailed(ERROR_MESSAGES.GET_MY_POST, result.error);
                return res.status(400).json(response);
            }

            const response = buildSuccess(SUCCESS_MESSAGES.GET_MY_POST, result.data);
            res.status(200).json(response);
        } catch (error) {
            const response = buildFailed(ERROR_MESSAGES.GET_MY_POST, 'Internal server error');
            res.status(500).json(response);
        }
    };

    updatePost = async (req: Request, res: Response) => {
        try {
            const requestBody = req.body;
            const token = req.cookies.token;
            const payload = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload & { id: string; email: string };
            const userId = payload.id;
            
            if (requestBody.sellerId != userId) {
                const response = buildFailed(ERROR_MESSAGES.UNAUTHORIZED, 'Unauthorized Access');
                res.status(403).json(response);
            }

            const updatedAt = new Date().toISOString();
            const postDto = { ...requestBody, updatedAt }
            const result = await this.postService.updatePost(postDto);

            if (result.error) {
                const response = buildFailed(ERROR_MESSAGES.UPDATE_POST, result.error);
                return res.status(400).json(response);
            }

            const response = buildSuccess(SUCCESS_MESSAGES.UPDATE_POST, result.data);
            res.status(200).json(response);
        } catch (error) {
            const response = buildFailed(ERROR_MESSAGES.UPDATE_POST, 'Internal server error');
            res.status(500).json(response);
        }
    };

    updatePostStatus = async (req: Request, res: Response) => {
        try {
            const requestBody = req.body;
            const token = req.cookies.token;
            const payload = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload & { id: string; email: string };
            const userId = payload.id;
            
            if (requestBody.sellerId != userId) {
                const response = buildFailed(ERROR_MESSAGES.UNAUTHORIZED, 'Unauthorized Access');
                res.status(403).json(response);
            }

            const updatedAt = new Date().toISOString();
            const postDto = { ...requestBody, updatedAt }
            const result = await this.postService.updatePostStatus(postDto);

            if (result.error) {
                const response = buildFailed(ERROR_MESSAGES.UPDATE_POST_STATUS, result.error);
                return res.status(400).json(response);
            }

            const response = buildSuccess(SUCCESS_MESSAGES.UPDATE_POST_STATUS, result.data);
            res.status(200).json(response);
        } catch (error) {
            const response = buildFailed(ERROR_MESSAGES.UPDATE_POST_STATUS, 'Internal server error');
            res.status(500).json(response);
        }
    };

    deletePost = async (req: Request, res: Response) => {
        try {
            const requestBody = req.body;
            const token = req.cookies.token;
            const payload = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload & { id: string; email: string };
            const userId = payload.id;
            
            if (requestBody.sellerId != userId) {
                const response = buildFailed(ERROR_MESSAGES.UNAUTHORIZED, 'Unauthorized Access');
                res.status(403).json(response);
            }

            const postId  = requestBody.id
            const result = await this.postService.deletePost(postId);

            if (result.error) {
                const response = buildFailed(ERROR_MESSAGES.DELETE_POST, result.error);
                return res.status(400).json(response);
            }

            const response = buildSuccess(SUCCESS_MESSAGES.DELETE_POST);
            res.status(200).json(response);
        } catch (error) {
            const response = buildFailed(ERROR_MESSAGES.DELETE_POST, 'Internal server error');
            res.status(500).json(response);
        }
    };
}