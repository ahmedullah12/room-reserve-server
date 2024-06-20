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
const User_model_1 = require("../User/User.model");
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { slots, room, user } = payload;
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
    const isUserExists = yield User_model_1.User.isUserExistById(user);
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `User doesn't exists`);
    }
    // Checking if each slot exists
    for (const slotId of slots) {
        const slotExists = yield Slots_model_1.Slot.isSlotExists(slotId);
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
            throw new Error('Failed to booked the slots');
        }
        const newPayload = Object.assign(Object.assign({}, payload), { totalAmount });
        const newBooking = yield Booking_model_1.Booking.create([newPayload], { session });
        const populatedResult = yield (yield (yield newBooking[0].populate({
            path: 'slots',
            options: { skipIsBookedCheck: true },
        })).populate('room')).populate('user');
        yield session.commitTransaction();
        yield session.endSession();
        return populatedResult;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Booking_model_1.Booking.find()
        .populate({
        path: 'slots',
        options: { skipIsBookedCheck: true },
    })
        .populate('room')
        .populate('user');
    return result;
});
const updateBookingIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //checking if booking exists
    const isBookingExists = yield Booking_model_1.Booking.isBookingExists(id);
    if (!isBookingExists) {
        throw new Error("Booking doesn't exists");
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
        throw new Error("Booking doesn't exists");
    }
    const result = yield Booking_model_1.Booking.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    updateBookingIntoDB,
    deleteBookingFromDB,
};
