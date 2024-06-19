/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { ConfirmState } from './Booking.constant';

export type TBooking = {
  date: string;
  slots: Types.ObjectId[];
  room: Types.ObjectId;
  user: Types.ObjectId;
  totalAmount: number;
  isConfirmed: keyof typeof ConfirmState;
  isDeleted: boolean;
};

export interface BookingModel extends Model<TBooking> {
  isBookingExists(id: string): Promise<TBooking>;
}
