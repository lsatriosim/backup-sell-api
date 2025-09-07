import { 
  PaginationMeta, 
  ServiceResult, 
  PaginatedServiceResult 
} from './response_dto';


// ============== REQUEST DTOs ==============
export interface RegisterUserDto {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: string;
}

export interface UpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface SendVerificationEmailDto {
  email: string;
}

export interface VerifyEmailDto {
  token: string;
  email: string;
}

export interface UserProfileDto {
  userId: string,
  name: string,
  email: string,
  phone?: number,
}

export interface SellerDTO {
  id: string,
  name: string,
  email: string,
  phone?: number,
}

// ============== RESPONSE DTOs ==============
export interface UserResponse {
  id?: string;
  email?: string;
  name?: string;
  phone?: string;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}

export interface LoginResponse extends AuthResponse {
  expiresIn: string;
  refreshToken?: string;
}


export interface UsersListResponse {
  users: UserResponse[];
}

export interface PaginatedUsersResponse {
  data: UserResponse[];
  meta: PaginationMeta;
}

export interface UserCreateResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  message: string;
}

export interface UserUpdateResponse extends UserResponse {
  updatedFields: string[];
}

export interface PasswordUpdateResponse {
  message: string;
  updatedAt: Date;
}

export interface EmailVerificationResponse {
  message: string;
  isVerified: boolean;
  verifiedAt: Date;
}

// ============== SERVICE RESULT TYPES ==============
export interface AuthServiceResult extends ServiceResult<AuthResponse> {
  token?: string;
  user?: UserResponse;
}

export interface UserServiceResult extends ServiceResult<UserResponse> {
  user?: UserResponse;
}

export interface PaginatedUserServiceResult extends PaginatedServiceResult<UserResponse[]> {
  users?: UserResponse[];
}