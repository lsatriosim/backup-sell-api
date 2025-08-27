import { Request, Response } from 'express';
import { AuthService } from '../services/auth_services';
import {
  RegisterUserDto, 
  LoginUserDto,
} from '../dtos/user_dto';
import { buildSuccess, buildFailed } from '../utils/response_builder';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants/user_messages';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  checkAuth = (req: Request, res: Response) => {
    const response = buildSuccess(SUCCESS_MESSAGES.CHECK_AUTH, { isAdmin: true });
    res.status(200).json(response);
  };

  register = async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const registerDto: RegisterUserDto = req.body;
      const result = await this.authService.registerUser(registerDto);
      
      if (!result.success) {
        const response = buildFailed(ERROR_MESSAGES.REGISTER_USER, result.error);
        return res.status(400).json(response);
      }

      const response = buildSuccess(SUCCESS_MESSAGES.REGISTER_USER, result.user);
      res.status(201).json(response);
    } catch (error) {
      const response = buildFailed(ERROR_MESSAGES.REGISTER_USER, 'Internal server error');
      res.status(500).json(response);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const loginDto: LoginUserDto = req.body;
      const result = await this.authService.loginUser(loginDto);
      
      if (result.error) {
        const statusCode = result.error === 'Invalid credentials' ? 401 : 403;
        const response = buildFailed(ERROR_MESSAGES.LOGIN, result.error);
        return res.status(statusCode).json(response);
      }

      res.cookie('token', result.token!, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000
      });

      if (!result.authResp?.user) {
      const response = buildFailed(ERROR_MESSAGES.LOGIN, 'User data not found');
      return res.status(400).json(response); 
    }

      const flattenedData = {
        token: result.authResp.token,
        ...result.authResp.user  
      };
      
      const response = buildSuccess(SUCCESS_MESSAGES.LOGIN, flattenedData);
      res.status(200).json(response);
    } catch (error) {
      const response = buildFailed(ERROR_MESSAGES.LOGIN, 'Internal server error');
      res.status(500).json(response);
    }
  };

  logout = (req: Request, res: Response) => {
    res.clearCookie('token');
    const response = buildSuccess(SUCCESS_MESSAGES.LOGOUT);
    res.status(200).json(response);
  };

  getProfile = async (req: Request, res: Response) => {
    try {
      const token = req.cookies.token;

      if (!token) {
        const response = buildFailed(ERROR_MESSAGES.UNAUTHORIZED, 'No token provided');
        return res.status(401).json(response);
      }

      const result = await this.authService.getUserProfile(token);
      
      if (!result.success) {
        const statusCode = result.error === 'Invalid token' ? 403 : 400;
        const response = buildFailed(ERROR_MESSAGES.GET_USER, result.error);
        return res.status(statusCode).json(response);
      }

      const response = buildSuccess(SUCCESS_MESSAGES.GET_USER, result.profile);
      res.status(200).json(response);
    } catch (error) {
      const response = buildFailed(ERROR_MESSAGES.GET_USER, 'Internal server error');
      res.status(500).json(response);
    }
  };
}