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
exports.SlotsServices = void 0;
const Slots_model_1 = require("./Slots.model");
const createSlotsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { room, date, startTime } = payload;
    const validateTimeDifference = yield Slots_model_1.Slot.validateTimeDifference(payload);
    if (!validateTimeDifference) {
        throw new Error('Invalid time difference. The difference between startTime and endTime should be a whole number of hours');
    }
    // getting the slots counts
    const slotsCounts = yield Slots_model_1.Slot.slosCounts(payload);
    // generating the slots intervals
    const slotIntervals = [];
    let currentTime = startTime;
    for (let i = 0; i < slotsCounts; i++) {
        const [startHour, startMinute] = currentTime.split(':').map(Number);
        const endHour = startHour + 1;
        const endMinute = startMinute;
        const slotStartTime = currentTime;
        const slotEndTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
        slotIntervals.push({ startTime: slotStartTime, endTime: slotEndTime });
        currentTime = slotEndTime;
    }
    //creating slots
    const createSlotsPromises = slotIntervals.map((slot) => __awaiter(void 0, void 0, void 0, function* () {
        const newSlot = {
            room,
            date,
            startTime: slot.startTime,
            endTime: slot.endTime,
        };
        return Slots_model_1.Slot.create(newSlot);
    }));
    const createdSlots = yield Promise.all(createSlotsPromises);
    const result = createdSlots;
    return result;
});
const getAvailableSlotsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchCriteria = {};
    //adding if there is date in query
    if (query.date) {
        searchCriteria.date = query.date;
    }
    //adding if there is roomId in query
    if (query.roomId) {
        searchCriteria.room = query.roomId;
    }
    // by default searchCriteria is emply object , so should get all the data
    const result = yield Slots_model_1.Slot.find(searchCriteria).populate("room");
    return result;
});
exports.SlotsServices = {
    createSlotsIntoDB,
    getAvailableSlotsFromDB,
};
