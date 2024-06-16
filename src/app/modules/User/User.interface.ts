import { Model } from 'mongoose';

export type TRole = 'user' | 'admin';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: TRole;
  address: string;
};

export type TLoginUser = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}
