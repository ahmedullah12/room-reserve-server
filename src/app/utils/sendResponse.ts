import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  token?: string;
  message?: string;
  data: T;
  meta?: any;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    token: data?.token,
    data: data.data,
    meta: data.meta,
  });
};

export default sendResponse;
