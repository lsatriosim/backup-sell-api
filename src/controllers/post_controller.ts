import { Request, Response } from 'express';
import { PostDto } from "dtos/post_dto";
import jwt from 'jsonwebtoken';
import { PostService } from "../services/post_services";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants/user_messages';
import { buildFailed, buildSuccess } from '../utils/response_builder';

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
      const postDto = {...requestBody, userId, status}
      const result = await this.postService.createPost(postDto);
      
      if (result.error) {
        const response = buildFailed("Failed to create post", result.error);
        return res.status(400).json(response); 
      }
      
      const response = buildSuccess(SUCCESS_MESSAGES.LOGIN, result.data);
      res.status(200).json(response);
    } catch (error) {
      const response = buildFailed(ERROR_MESSAGES.LOGIN, 'Internal server error');
      res.status(500).json(response);
    }
  };
}