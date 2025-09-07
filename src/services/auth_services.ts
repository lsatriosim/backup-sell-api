import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user_repository';
import { RegisterUserDto, LoginUserDto, UserResponse, AuthResponse } from '../dtos/user_dto';
import { User } from '../entities/user_entity';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(registerDto: RegisterUserDto): Promise<{ success: boolean; error?: string; user?: User, token?: string}> {
    try {

      const { user, error: userError } = await this.userRepository.createUser(registerDto);

      if (userError) {
        return { success: false, error: userError.message };
      }

      const token = this.generateToken({
        id: user.id,
        email: user.email
      });
      
      return { 
        success: true, 
        user: user,
        token: token
      };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  }

  async updateUser(userId: string, updates: { name?: string; phone?: string }): Promise<{ success: boolean; error?: string; user?: User}> {
    try {

      const { user, error: userError } = await this.userRepository.updateUser(userId, updates);
      if (userError) {
        return { success: false, error: userError.message };
      }

      return { 
        success: true, 
        user: user,
      };
    } catch (error) {
      return { success: false, error: 'Update Profile failed' };
    }
  }

  async loginUser(loginDto: LoginUserDto): Promise<{
    success: boolean; 
    token?: string;
    error?: string;
    authResp?: AuthResponse;
  }> {
    try {
      const { user, error: authError } = await this.userRepository.signInUser(loginDto);
      if (authError) {
        return { success: false, error: 'Invalid credentials'};
      }

      // Generate JWT token
      const token = this.generateToken({
        id: user.id,
        email: user.email
      });

      
      const userResp: UserResponse = {
        email: user.email,
        name: user.name,
        createdAt: new Date(user.created_at),
        updatedAt: new Date(user.updated_at)
      };

      const authData: AuthResponse = {
        token: token,
        user: userResp,
      };

      return { 
        success: true,
        authResp: authData,
      };
    } catch (error) {
      return { 
        success: false,
        error: 'Login failed' 
      };
    }
  }

  async getUserProfile(token: string): Promise<{ 
    success: boolean; 
    profile?: UserResponse; 
    error?: string 
  }> {
    try {

      const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
      const userId = payload.id;

      const { user, error: userError } = await this.userRepository.getUserById(userId);
      
      if (userError) {
        return { success: false, error: 'Profile not found' };
      }

      const profile: UserResponse = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: new Date(user.created_at),
        updatedAt: new Date(user.updated_at || user.created_at),
      };

      return { success: true, profile };
    } catch (error) {
      return { success: false, error: 'Invalid token' };
    }
  }

  async logOut(): Promise<{ 
    success: boolean; 
    error?: string 
  }> {
    try {
      const { error: userError } = await this.userRepository.logoutUser();
      
      if (userError) {
        return { success: false, error: 'Failed to logout' };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to logout' };
    }
  }

  private generateToken(payload: { id: string; email: string; }): string {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
  }

  verifyToken(token: string): { valid: boolean; payload?: any; error?: string } {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!);
      return { valid: true, payload };
    } catch (error) {
      return { valid: false, error: 'Invalid token' };
    }
  }
}
