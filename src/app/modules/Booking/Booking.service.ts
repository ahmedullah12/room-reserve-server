/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { Room } from '../Room/Room.model';
import { TBooking } from './Booking.interface';
import { Booking } from './Booking.model';
import { Slot } from '../Slots/Slots.model';
import { User } from '../User/User.model';

const createBookingIntoDB = async (payload: TBooking) => {
  const { slots, room } = payload;
  //checking if room exists
  const isRoomExists = await Room.isRoomExists(String(room));
  if (!isRoomExists) {
    throw new Error("Room doesn't exists");
  }

  //checking if the room deleted or not
  const isRoomDeleted = await Room.isRoomDeleted(String(room));
  if (!isRoomDeleted) {
    throw new Error("Room doesn't exists");
  }

  //checking if user exists or not
  const isUserExists = await User.isUserExistById(room);
  if (!isUserExists) {
    throw new Error(`User doesn't exists`);
  }

  // Checking if each slot exists
  for (const slotId of slots) {
    const slotExists = await Slot.isSlotExists(slotId);
    if (!slotExists) {
      throw new Error(`Slot ${slotId} doesn't exist`);
    }
  }

  //getting the totalAmount for booking
  const roomPricePerSlot = await Room.roomPricePerSlot(String(room));
  const totalAmount = roomPricePerSlot * payload.slots.length;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updateSlots = await Slot.updateMany(
      { _id: { $in: slots } },
      { $set: { isBooked: true } },
      { session },
    );

    if (!updateSlots) {
      throw new Error('Failed to booked the slots');
    }

    const newPayload = { ...payload, totalAmount };
    const newBooking = await Booking.create([newPayload], { session });
    const populatedResult = await (
      await (
        await newBooking[0].populate({
          path: 'slots',
          options: { skipIsBookedCheck: true },
        })
      ).populate('room')
    ).populate('user');

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
    .populate({
      path: 'slots',
      options: { skipIsBookedCheck: true },
    })
    .populate('room')
    .populate('user');

  return result;
};



const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
  //checking if booking exists
  const isBookingExists = await Booking.isBookingExists(id);
  if (!isBookingExists) {
    throw new Error("Booking doesn't exists");
  }

  const result = await Booking.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};
const deleteBookingFromDB = async (id: string) => {
  //checking if booking exists
  const isBookingExists = await Booking.isBookingExists(id);
  if (!isBookingExists) {
    throw new Error("Booking doesn't exists");
  }

  const result = await Booking.findByIdAndUpdate(id, { isDeleted: true }, {new: true});

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
};
