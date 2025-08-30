export interface BaseResponse<T = any> {
  status: boolean;
  message: string;
  data?: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginationRequestDto {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ServiceResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedServiceResult<T> extends ServiceResult<T> {
  meta?: PaginationMeta;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface ErrorResponse {
  error: string;
  details?: ValidationError[];
  timestamp: Date;
}

export interface TimeStamp{
  createdAt: Date;
  updatedAt: Date;
}