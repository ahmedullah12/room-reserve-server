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
exports.MyBookingServices = void 0;
const Booking_model_1 = require("../Booking/Booking.model");
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const User_model_1 = require("../User/User.model");
const getUsersBookingsFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = user;
    //checking if user exists
    const isUserExists = (yield User_model_1.User.isUserExistByEmail(email));
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User doesn't exists");
    }
    const result = yield Booking_model_1.Booking.find({ userId: isUserExists._id }, { user: 0 })
        .populate({
        path: 'slots',
        options: { skipIsBookedCheck: true },
    })
        .populate('room');
    return result;
});
exports.MyBookingServices = {
    getUsersBookingsFromDB,
};
