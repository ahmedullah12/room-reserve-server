import { Schema, model } from 'mongoose';
import { TBooking, BookingModel } from './Booking.interface';

const bookingSchema = new Schema<TBooking>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  roomName: {type: String, required: true},
  time: [{type: String, required: true}],
  date: { type: String, required: true },
  slots: [{ type: Schema.Types.ObjectId, ref: 'Slot', required: true }],
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  totalAmount: { type: Number, required: true },
  isConfirmed: {
    type: String,
    enum: ['confirmed', 'unconfirmed', 'cancelled'],
    default: 'unconfirmed',
  },
  isRejected: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
});



bookingSchema.statics.isBookingExists = async function (id: string) {
  const result = await Booking.findById(id);
  return result;
};

export const Booking = model<TBooking, BookingModel>('Booking', bookingSchema);
