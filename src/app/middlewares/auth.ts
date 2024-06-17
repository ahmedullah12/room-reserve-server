import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TRole } from '../modules/User/User.interface';
import { User } from '../modules/User/User.model';

const auth = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // check if the token sent or not
    if (!token) {
      throw new Error('You are not authorized');
    }

    const decoded = jwt.verify(
      token,
      config.access_token_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded;

    const user = await User.isUserExist(email);

    //checking if the use exists
    if (!user) {
      throw new Error('User not found');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error('You are not authorized');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
