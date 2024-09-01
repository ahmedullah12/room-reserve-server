/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../error/AppError';
import httpStatus from 'http-status';
import { TRole } from '../modules/User/User.interface';
import { User } from '../modules/User/User.model';

const auth = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const fullToken = req.headers.authorization;

    // check if the token sent or not
    if (!fullToken) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'You have no access to this route',
      });
    }

    //removing the Bearer from the full token
    const token = fullToken.split(' ')[1];

    // checking if the given token is valid
    let decoded;
    try{
      decoded = jwt.verify(
        token,
        config.access_token_secret as string,
      ) as JwtPayload;
    }catch(err){
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized22');
    };

    const { email, role } = decoded;

    const user = await User.isUserExistByEmail(email);

    //checking if the use exists
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'You have no access to this route',
      });
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
