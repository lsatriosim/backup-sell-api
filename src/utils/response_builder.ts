// utils/response_builder.ts

import { BaseResponse, PaginationMeta } from '../dtos/response_dto';

export const buildSuccess = <T>(message: string, data?: T): BaseResponse<T> => ({
  status: true,
  message,
  data,
});

export const buildFailed = (message: string, error?: string): BaseResponse => ({
  status: false,
  message,
  data: error ? { error } : undefined,
});

export const buildSuccessWithMeta = <T>(
  message: string, 
  data: T, 
  meta: PaginationMeta
): BaseResponse<T> => ({
  status: true,
  message,
  data,
  meta,
});