"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_route_1 = require("../modules/Auth/Auth.route");
const Room_route_1 = require("../modules/Room/Room.route");
const Slots_route_1 = require("../modules/Slots/Slots.route");
const Booking_route_1 = require("../modules/Booking/Booking.route");
const MyBooking_route_1 = require("../modules/MyBooking/MyBooking.route");
const User_route_1 = require("../modules/User/User.route");
const Payment_route_1 = require("../modules/Payment/Payment.route");
const router = express_1.default.Router();
const modelRouter = [
    {
        path: '/auth',
        route: Auth_route_1.AuthRoutes,
    },
    {
        path: '/rooms',
        route: Room_route_1.RoomRoutes,
    },
    {
        path: '/slots',
        route: Slots_route_1.SlotsRoutes,
    },
    {
        path: '/bookings',
        route: Booking_route_1.BookingRoutes,
    },
    {
        path: '/my-bookings',
        route: MyBooking_route_1.MyBookingRoutes,
    },
    {
        path: '/users',
        route: User_route_1.UserRoutes,
    },
    {
        path: '/payment',
        route: Payment_route_1.PaymentRoutes,
    },
];
modelRouter.forEach((route) => router.use(route.path, route.route));
exports.default = router;
