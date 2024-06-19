import { Schema, model } from 'mongoose';
import { TBooking, BookingModel } from './Booking.interface';

const bookingSchema = new Schema<TBooking>({
  date: { type: String, required: true },
  slots: [{ type: Schema.Types.ObjectId, ref: 'Slot', required: true }],
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  totalAmount: {type: Number, required: true},
  isConfirmed: {type: String, enum: ["confirmed", "unconfirmed", "canceled"], default: "unconfirmed"},
  isDeleted: {type: Boolean, default: false},
});


bookingSchema.statics.isBookingExists = async function(id: string){
  const result = await Booking.findById(id);
  return result;
}

export const Booking = model<TBooking, BookingModel>("Booking", bookingSchema);
