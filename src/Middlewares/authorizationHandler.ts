import { NextFunction, Request, Response } from 'express';
import AppError from '../Helpers/AppError';
import catchAsync from '../Helpers/catchAsync';
import messages from '../Helpers/messages';

export default catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { headers } = req;

    // Check if authorization header exists
    if (!headers.authorization) {
      return next(new AppError(messages.ACCESS_REQ_ERR, 400));
    }

    const data = String(headers.authorization).split(' ');
    if (data.length < 0) {
      return next(new AppError(messages.ACCESS_REQ_ERR, 400));
    }
    const username = data.splice(0, 1).join(',');
    if (req.method === 'GET') {
      Object.assign(req.params, { username });
    } else {
      Object.assign(req.body, { username });
    }
    next();
  },
);

