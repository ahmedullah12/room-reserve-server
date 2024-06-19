"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyBookingRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const MyBooking_controller_1 = require("./MyBooking.controller");
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)("user"), MyBooking_controller_1.MyBookingController.getUsersBookings);
exports.MyBookingRoutes = router;
