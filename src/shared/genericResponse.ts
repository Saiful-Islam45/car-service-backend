import { Response } from 'express';

export type IApiReponse = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: unknown | null;
};

const genericResponse = (res: Response, data: IApiReponse): void => {
  const responseData: IApiReponse = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null,
  };

  res.status(data.statusCode).json(responseData);
};

export default genericResponse;
