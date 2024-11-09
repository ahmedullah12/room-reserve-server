"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const Room_model_1 = require("../Room/Room.model");
const Booking_model_1 = require("./Booking.model");
const Slots_model_1 = require("../Slots/Slots.model");
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const User_model_1 = require("../User/User.model");
const Payment_utils_1 = require("../Payment/Payment.utils");
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const stripe = new stripe_1.default(config_1.default.stripe_secret_key);
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { slots, room, userId } = payload;
    //checking if room exists
    const isRoomExists = yield Room_model_1.Room.isRoomExists(String(room));
    if (!isRoomExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Room doesn't exists");
    }
    //checking if the room deleted or not
    const isRoomDeleted = yield Room_model_1.Room.isRoomDeleted(String(room));
    if (!isRoomDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Room doesn't exists");
    }
    //checking if user exists or not
    const isUserExists = yield User_model_1.User.isUserExistById(userId);
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `User doesn't exists`);
    }
    // Checking if each slot exists
    for (const slotId of slots) {
        const slotExists = yield Slots_model_1.Slot.isSlotExists(String(slotId));
        if (!slotExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Slot ${slotId} doesn't exist`);
        }
    }
    //getting the totalAmount for booking
    const roomPricePerSlot = yield Room_model_1.Room.roomPricePerSlot(String(room));
    const totalAmount = roomPricePerSlot * payload.slots.length;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const updateSlots = yield Slots_model_1.Slot.updateMany({ _id: { $in: slots } }, { $set: { isBooked: true } }, { session });
        if (!updateSlots) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to booked the slots');
        }
        const newPayload = Object.assign(Object.assign({}, payload), { totalAmount });
        const result = yield Booking_model_1.Booking.create([newPayload], { session });
        yield session.commitTransaction();
        yield session.endSession();
        return result[0];
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const confirmBookingWithAmarpay = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield Booking_model_1.Booking.findById(bookingId);
    const transactionId = `TXN-RR-${Date.now()}`;
    const paymentData = {
        transactionId,
        bookingId,
        totalAmount: booking === null || booking === void 0 ? void 0 : booking.totalAmount,
        customerName: booking === null || booking === void 0 ? void 0 : booking.name,
        customerEmail: booking === null || booking === void 0 ? void 0 : booking.email,
        customerPhone: booking === null || booking === void 0 ? void 0 : booking.phone,
        customerAddress: booking === null || booking === void 0 ? void 0 : booking.address,
    };
    const paymentSession = yield (0, Payment_utils_1.initiatePayment)(paymentData);
    return paymentSession;
});
const confirmBookingWithStripe = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield Booking_model_1.Booking.findById(bookingId).populate('room');
    if (!booking) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found');
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
    const session = yield stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [lineItem],
        mode: 'payment',
        success_url: `http://localhost:5173/checkout/${bookingId}`,
        cancel_url: `http://localhost:5173/checkout/${bookingId}`,
        metadata: { bookingId },
    });
    return { id: session.id };
});
const getAllBookingsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingQuery = new QueryBuilder_1.default(Booking_model_1.Booking.find()
        .populate({
        path: 'slots',
        options: { skipIsBookedCheck: true },
    })
        .populate('room')
        .populate('userId'), query).paginate();
    const result = yield bookingQuery.modelQuery;
    const meta = yield bookingQuery.countTotal();
    return { result, meta };
});
const getSingleBookingFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Booking_model_1.Booking.findById(id);
    return result;
});
const updateBookingIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //checking if booking exists
    const isBookingExists = yield Booking_model_1.Booking.isBookingExists(id);
    if (!isBookingExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Booking doesn't exists");
    }
    const result = yield Booking_model_1.Booking.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteBookingFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //checking if booking exists
    const isBookingExists = yield Booking_model_1.Booking.isBookingExists(id);
    if (!isBookingExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Booking doesn't exists");
    }
    for (const slotId of isBookingExists.slots) {
        const slotExists = yield Slots_model_1.Slot.isSlotExists(String(slotId));
        if (!slotExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Slot ${slotId} doesn't exist`);
        }
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const updateSlots = yield Slots_model_1.Slot.updateMany({ _id: { $in: isBookingExists.slots } }, { $set: { isBooked: false } }, { session });
        if (!updateSlots) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to booked the slots');
        }
        const result = yield Booking_model_1.Booking.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const cancelBookingFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Checking if booking exists
    const isBookingExists = yield Booking_model_1.Booking.isBookingExists(id);
    if (!isBookingExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Booking doesn't exist");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Update slots to set isBooked to false
        const updateSlots = yield Slots_model_1.Slot.updateMany({ _id: { $in: isBookingExists.slots } }, { $set: { isBooked: false } }, { session });
        if (!updateSlots) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to unbook the slots');
        }
        // Update the booking status
        const result = yield Booking_model_1.Booking.findByIdAndUpdate(id, { isConfirmed: 'cancelled' }, { new: true, session });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, err.message);
    }
});
const approveBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Checking if booking exists
    const isBookingExists = yield Booking_model_1.Booking.isBookingExists(id);
    if (!isBookingExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Booking doesn't exist");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Check if any slot is already booked
        const bookedSlots = yield Slots_model_1.Slot.find({
            _id: { $in: isBookingExists.slots },
            isBooked: true,
        });
        if (bookedSlots.length > 0) {
            throw new AppError_1.default(http_status_1.default.CONFLICT, 'One or more slots are already booked');
        }
        // Update slots to set isBooked to true
        const updateSlots = yield Slots_model_1.Slot.updateMany({ _id: { $in: isBookingExists.slots } }, { $set: { isBooked: true } }, { session });
        if (!updateSlots) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to book the slots');
        }
        // Update the booking status
        const result = yield Booking_model_1.Booking.findByIdAndUpdate(id, { isRejected: false }, { new: true, session });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, err.message);
    }
});
const rejectBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Checking if booking exists
    const isBookingExists = yield Booking_model_1.Booking.isBookingExists(id);
    if (!isBookingExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Booking doesn't exist");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Update slots to set isBooked to false
        const updateSlots = yield Slots_model_1.Slot.updateMany({ _id: { $in: isBookingExists.slots } }, { $set: { isBooked: false } }, { session });
        if (!updateSlots) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to unbook the slots');
        }
        // Update the booking status
        const result = yield Booking_model_1.Booking.findByIdAndUpdate(id, { isRejected: true }, { new: true, session });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, err.message);
    }
});
exports.BookingServices = {
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
