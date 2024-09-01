import { JwtPayload } from 'jsonwebtoken';
import { Booking } from '../Booking/Booking.model';
import { Types } from 'mongoose';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { TUser } from '../User/User.interface';
import { User } from '../User/User.model';

interface TUserWithId extends TUser {
  _id: Types.ObjectId;
}

const getUsersBookingsFromDB = async (user: JwtPayload) => {
  const { email } = user;


  //checking if user exists
  const isUserExists = (await User.isUserExistByEmail(email)) as TUserWithId;
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User doesn't exists");
  }

  const result = await Booking.find({ userId: isUserExists._id }, { user: 0 })
    .populate({
      path: 'slots',
      options: { skipIsBookedCheck: true },
    })
    .populate('room');
  return result;
};

export const MyBookingServices = {
  getUsersBookingsFromDB,
};
