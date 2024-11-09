/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { Room } from '../Room/Room.model';
import { TBooking } from './Booking.interface';
import { Booking } from './Booking.model';
import { Slot } from '../Slots/Slots.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { User } from '../User/User.model';
import { initiatePayment } from '../Payment/Payment.utils';
import Stripe from 'stripe';
import config from '../../config';
import QueryBuilder from '../../builder/QueryBuilder';
const stripe = new Stripe(config.stripe_secret_key as string);

const createBookingIntoDB = async (payload: TBooking) => {
  const { slots, room, userId } = payload;
  //checking if room exists
  const isRoomExists = await Room.isRoomExists(String(room));
  if (!isRoomExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Room doesn't exists");
  }

  //checking if the room deleted or not
  const isRoomDeleted = await Room.isRoomDeleted(String(room));
  if (!isRoomDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Room doesn't exists");
  }

  //checking if user exists or not
  const isUserExists = await User.isUserExistById(userId);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, `User doesn't exists`);
  }

  // Checking if each slot exists
  for (const slotId of slots) {
    const slotExists = await Slot.isSlotExists(String(slotId));
    if (!slotExists) {
      throw new AppError(httpStatus.NOT_FOUND, `Slot ${slotId} doesn't exist`);
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
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to booked the slots');
    }

    const newPayload = { ...payload, totalAmount };
    const result = await Booking.create([newPayload], { session });

    await session.commitTransaction();
    await session.endSession();

    return result[0];
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const confirmBookingWithAmarpay = async (bookingId: string) => {
  const booking = await Booking.findById(bookingId);

  const transactionId = `TXN-RR-${Date.now()}`;

  const paymentData = {
    transactionId,
    bookingId,
    totalAmount: booking?.totalAmount,
    customerName: booking?.name,
    customerEmail: booking?.email,
    customerPhone: booking?.phone,
    customerAddress: booking?.address,
  };

  const paymentSession = await initiatePayment(paymentData);

  return paymentSession;
};

const confirmBookingWithStripe = async (bookingId: string) => {
  const booking = await Booking.findById(bookingId).populate('room');

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  const lineItem = {
    price_data: {
      currency: 'usd',
      product_data: {
        name: booking.roomName,
      },
      unit_amount: booking.totalAmount * 100,
    },
    quantity: booking.slots.length,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [lineItem],
    mode: 'payment',
    success_url: `http://localhost:5173/checkout/${bookingId}`,
    cancel_url: `http://localhost:5173/checkout/${bookingId}`,
    metadata: { bookingId },
  });

  return { id: session.id };
};

const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(
    Booking.find()
      .populate({
        path: 'slots',
        options: { skipIsBookedCheck: true },
      })
      .populate('room')
      .populate('userId'),
    query,
  ).paginate();

  const result = await bookingQuery.modelQuery;
  const meta = await bookingQuery.countTotal();

  return { result, meta };
};

const getSingleBookingFromDB = async (id: string) => {
  const result = await Booking.findById(id);

  return result;
};

const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
  //checking if booking exists
  const isBookingExists = await Booking.isBookingExists(id);
  if (!isBookingExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking doesn't exists");
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
    throw new AppError(httpStatus.NOT_FOUND, "Booking doesn't exists");
  }

  for (const slotId of isBookingExists.slots) {
    const slotExists = await Slot.isSlotExists(String(slotId));
    if (!slotExists) {
      throw new AppError(httpStatus.NOT_FOUND, `Slot ${slotId} doesn't exist`);
    }
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const updateSlots = await Slot.updateMany(
      { _id: { $in: isBookingExists.slots } },
      { $set: { isBooked: false } },
      { session },
    );

    if (!updateSlots) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to booked the slots');
    }

    const result = await Booking.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const cancelBookingFromDB = async (id: string) => {
  // Checking if booking exists
  const isBookingExists = await Booking.isBookingExists(id);
  if (!isBookingExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking doesn't exist");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Update slots to set isBooked to false
    const updateSlots = await Slot.updateMany(
      { _id: { $in: isBookingExists.slots } },
      { $set: { isBooked: false } },
      { session },
    );

    if (!updateSlots) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to unbook the slots');
    }

    // Update the booking status
    const result = await Booking.findByIdAndUpdate(
      id,
      { isConfirmed: 'cancelled' },
      { new: true, session },
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
};

const approveBooking = async (id: string) => {
  // Checking if booking exists
  const isBookingExists = await Booking.isBookingExists(id);
  if (!isBookingExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking doesn't exist");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Check if any slot is already booked
    const bookedSlots = await Slot.find({
      _id: { $in: isBookingExists.slots },
      isBooked: true,
    });

    if (bookedSlots.length > 0) {
      throw new AppError(
        httpStatus.CONFLICT,
        'One or more slots are already booked',
      );
    }

    // Update slots to set isBooked to true
    const updateSlots = await Slot.updateMany(
      { _id: { $in: isBookingExists.slots } },
      { $set: { isBooked: true } },
      { session },
    );

    if (!updateSlots) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to book the slots');
    }

    // Update the booking status
    const result = await Booking.findByIdAndUpdate(
      id,
      { isRejected: false },
      { new: true, session },
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
};

const rejectBooking = async (id: string) => {
  // Checking if booking exists
  const isBookingExists = await Booking.isBookingExists(id);
  if (!isBookingExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking doesn't exist");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Update slots to set isBooked to false
    const updateSlots = await Slot.updateMany(
      { _id: { $in: isBookingExists.slots } },
      { $set: { isBooked: false } },
      { session },
    );

    if (!updateSlots) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to unbook the slots');
    }

    // Update the booking status
    const result = await Booking.findByIdAndUpdate(
      id,
      { isRejected: true },
      { new: true, session },
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getSingleBookingFromDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
  confirmBookingWithAmarpay,
  confirmBookingWithStripe,
  cancelBookingFromDB,
  approveBooking,
  rejectBooking,
};
