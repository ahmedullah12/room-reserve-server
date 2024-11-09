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
exports.cronJobs = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const Booking_service_1 = require("../modules/Booking/Booking.service");
const setupBookingCronJobs = () => {
    // Run every 5 minutes
    node_cron_1.default.schedule('*/5 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('Running expired bookings check...');
            yield Booking_service_1.BookingServices.checkAndCancelExpiredBookings();
            console.log('Completed expired bookings check');
        }
        catch (error) {
            console.error('Error in booking cron job:', error);
        }
    }));
};
// Optional: Add a function to check for any unprocessed bookings on server startup
const checkUnprocessedBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Checking for unprocessed bookings on startup...');
        yield Booking_service_1.BookingServices.checkAndCancelExpiredBookings();
        console.log('Completed startup booking check');
    }
    catch (error) {
        console.error('Error checking unprocessed bookings:', error);
    }
});
exports.cronJobs = {
    setupBookingCronJobs,
    checkUnprocessedBookings,
};
