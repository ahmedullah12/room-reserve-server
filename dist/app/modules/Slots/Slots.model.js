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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = void 0;
const mongoose_1 = require("mongoose");
const slotsSchema = new mongoose_1.Schema({
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Room',
    },
    date: {
        type: String,
        required: true,
    },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
});
slotsSchema.statics.isSlotExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const slot = yield exports.Slot.findById(id);
        return slot;
    });
};
slotsSchema.statics.validateTimeDifference = function (payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const { startTime, endTime } = payload;
        // Convert start and end times to Date objects
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);
        const startDate = new Date(0, 0, 0, startHour, startMinute);
        const endDate = new Date(0, 0, 0, endHour, endMinute);
        // Calculate the difference in hours
        const diffHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
        // Check if the difference is a whole number between 1 and 24
        return diffHours >= 1 && diffHours <= 24 && Number.isInteger(diffHours);
    });
};
slotsSchema.statics.slotsCounts = function (payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const { startTime, endTime } = payload;
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);
        const startMinutes = startHour * 60 + startMinute;
        const endMinutes = endHour * 60 + endMinute;
        // Calculate total duration in minutes
        const totalDuration = endMinutes - startMinutes;
        // Calculate the number of slots (assuming each slot is 1 hour)
        const slotDuration = 60; // 1 hour in minutes
        const numberOfSlots = Math.floor(totalDuration / slotDuration);
        return numberOfSlots;
    });
};
exports.Slot = (0, mongoose_1.model)('Slot', slotsSchema);
