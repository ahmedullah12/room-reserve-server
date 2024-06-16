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
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.set("toJSON", {
    transform: (doc, {password, ...rest}, option) => rest
})


userSchema.statics.isUserExist = async function (email: string) {
  return await User.findOne({ email });
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
