/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './User.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

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

userSchema.set("toJSON", {
    //not sending the password field
    transform: (doc, {password, ...rest}, option) => rest
})


userSchema.statics.isUserExist = async function (email: string) {
  //checking if the user exists
  return await User.findOne({ email });
};

userSchema.statics.isPasswordMatched = async function (
  //checking if the passwrod match
  plainTextPassword,
  hashPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
