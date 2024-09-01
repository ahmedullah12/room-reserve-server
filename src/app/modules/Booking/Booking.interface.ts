/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { ConfirmState } from './Booking.constant';

export type TBooking = {
  userId: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  address: string;
  roomName: string;
  time: string[];
  date: string;
  slots: Types.ObjectId[];
  room: Types.ObjectId;
  totalAmount: number;
  isConfirmed: keyof typeof ConfirmState;
  isRejected: boolean;
  isDeleted: boolean;
};

export interface BookingModel extends Model<TBooking> {
  isBookingExists(id: string): Promise<TBooking>;
}
