import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TRole } from '../modules/User/User.interface';
import { User } from '../modules/User/User.model';

const auth = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const fullToken = req.headers.authorization;


    // check if the token sent or not
    if (!fullToken) {
      throw new Error('You have no access to this route');
    }

    //removing the Bearer from the full token
    const token = fullToken.split(' ')[1];

    const decoded = jwt.verify(
      token,
      config.access_token_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded;

    const user = await User.isUserExistByEmail(email);

    //checking if the use exists
    if (!user) {
      throw new Error('User not found');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error('You have no access to this route');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
