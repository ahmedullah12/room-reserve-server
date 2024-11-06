"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const Booking_validation_1 = require("./Booking.validation");
const Booking_controller_1 = require("./Booking.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('user'), (0, validateRequest_1.validateRequest)(Booking_validation_1.BookingValidations.createBookingSchemaValidation), Booking_controller_1.BookingController.createBooking);
router.get('/', (0, auth_1.default)('admin'), Booking_controller_1.BookingController.getAllBooking);
router.get('/:id', Booking_controller_1.BookingController.getSingleBooking);
router.put('/:id', (0, auth_1.default)('admin'), (0, validateRequest_1.validateRequest)(Booking_validation_1.BookingValidations.updateBookingSchemaValidation), Booking_controller_1.BookingController.updateBooking);
router.delete('/:id', (0, auth_1.default)('admin'), Booking_controller_1.BookingController.deleteBooking);
router.delete('/:id/cancel', Booking_controller_1.BookingController.cancelBooking);
router.put('/:id/approve', Booking_controller_1.BookingController.approveBooking);
router.put('/:id/reject', Booking_controller_1.BookingController.rejectBooking);
router.put('/:bookingId/pay-with-amarpay', Booking_controller_1.BookingController.confirmBookingWithAmarpay);
router.put('/:bookingId/pay-with-stripe', Booking_controller_1.BookingController.confirmBookingWithStripe);
exports.BookingRoutes = router;
