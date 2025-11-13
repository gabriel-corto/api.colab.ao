import { Request } from 'express';

//API RESPONSES
export interface ApiSuccessResponse {
  data: T;
  message?: string;
}

export interface ApiPageDataResponse {
  data: T[];
  metadata?: Metadata;
}

export interface Metadata {
  page?: number;
  nextPage?: number;

  totalPage?: number;
  totalData?: number;

  hasNextPage?: boolean;
  previousPage?: number;
  hasPreviousPage?: boolean;
}

//AUTH AND TOKEN
export interface TokenPayload {
  user: {
    id: string;
    email: string;
  };
}

export interface TokenOptions {
  payload: TokenPayload;
  type: 'access' | 'refresh';
}

export interface AppRequest extends Request {
  token?: TokenPayload;
}
