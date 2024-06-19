/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { Room } from '../Room/Room.model';
import { TBooking } from './Booking.interface';
import { Booking } from './Booking.model';
import { Slot } from '../Slots/Slots.model';

const createBookingIntoDB = async (payload: TBooking) => {
  const { slots } = payload;
  //checking if room exists
  const isRoomExists = await Room.isRoomExists(String(payload.room));
  if (!isRoomExists) {
    throw new Error("Room doesn't exists");
  }

  //checking if the room deleted or not
  const isRoomDeleted = await Room.isRoomDeleted(String(payload.room));
  if (!isRoomDeleted) {
    throw new Error("Room doesn't exists");
  }

  //getting the totalAmount for booking
  const roomPricePerSlot = await Room.roomPricePerSlot(String(payload.room));
  const totalAmount = roomPricePerSlot * payload.slots.length;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updateSlots =  await Slot.updateMany(
        { _id: { $in: slots } },
        { $set: { isBooked: true } },
        { session }
      );

    if (!updateSlots) {
      throw new Error('Failed to booked the slots');
    }

    const newPayload = { ...payload, totalAmount };
    const newBooking = await Booking.create([newPayload], { session });
    console.log(newBooking);
    const populatedResult = await (await (await newBooking[0]
      .populate({ path: 'slots', options: { skipIsBookedCheck: true } }))
      .populate('room'))
      .populate('user');
    console.log(populatedResult);

    await session.commitTransaction();
    await session.endSession();

    return populatedResult;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find()
    .populate('slots')
    .populate('room')
    .populate('user');

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
};
