/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import { TUser, UserModel } from './User.interface';

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
  },
  address: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  // hashing the password before saving in the database
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.set('toJSON', {
  //not sending the password field
  transform: (doc, { password, ...rest }, option) => rest,
});

//checking if the user exists with email
userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await User.findOne({ email });
};

//checking if the user exists with id
userSchema.statics.isUserExistById = async function (
  id: Schema.Types.ObjectId,
) {
  return await User.findById(id);
};

userSchema.statics.isPasswordMatched = async function (
  //checking if the passwrod match
  plainTextPassword,
  hashPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
