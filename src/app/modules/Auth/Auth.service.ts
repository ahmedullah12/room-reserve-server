import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../error/AppError';
import { TLoginUser } from './Auth.interface';
import { createToken, verifyToken } from './Auth.utils';
import { TUser } from '../User/User.interface';
import { User } from '../User/User.model';

const signUpUser = async (payload: TUser) => {
  const jwtPayload = {
    email: payload?.email,
    name: payload?.name,
    role: payload?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    '1d',
  );
  const refreshToken = createToken(
    jwtPayload,
    config.refresh_token_secret as string,
    '30d',
  );
  const user = await User.create(payload);

  return {
    accessToken,
    refreshToken,
    user,
  };
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!user.password) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isPasswordMatch = await User.isPasswordMatched(
    payload.password,
    user.password!,
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password doesn't match");
  }

  const jwtPayload = {
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    '1d',
  );
  const refreshToken = createToken(
    jwtPayload,
    config.refresh_token_secret as string,
    '30d',
  );

  return {
    refreshToken,
    accessToken,
    user,
  };
};



const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.refresh_token_secret as string);
  const { email } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const jwtPayload = {
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    '1d',
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  signUpUser,
  loginUser,
  refreshToken,
};
