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
exports.SlotsServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const Room_model_1 = require("../Room/Room.model");
const Slots_model_1 = require("./Slots.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createSlotsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { room, date, startTime } = payload;
    //checking if room exists
    const isRoomExists = yield Room_model_1.Room.isRoomExists(String(room));
    if (!isRoomExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Room doesn't exists");
    }
    const isRoomDeleted = yield Room_model_1.Room.isRoomDeleted(String(room));
    if (!isRoomDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Room doesn't exists");
    }
    const validateTimeDifference = yield Slots_model_1.Slot.validateTimeDifference(payload);
    if (!validateTimeDifference) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid time difference. The difference between startTime and endTime should be a whole number of hours');
    }
    // getting the slots counts
    const slotsCounts = yield Slots_model_1.Slot.slotsCounts(payload);
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
    // const result = await Slot.find(searchCriteria).populate('room');
    const slotQuery = new QueryBuilder_1.default(Slots_model_1.Slot.find(searchCriteria).populate('room'), query).paginate();
    const result = yield slotQuery.modelQuery;
    const meta = yield slotQuery.countTotal();
    return {
        result, meta
    };
});
const updateSlotIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Checking if the slot exists
    const isSlotExists = yield Slots_model_1.Slot.isSlotExists(id);
    if (!isSlotExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Slot not found');
    }
    // If both startTime and endTime are provided in the payload, validate the time difference
    if (payload.startTime && payload.endTime) {
        const [startHour, startMinute] = payload.startTime.split(':').map(Number);
        const [endHour, endMinute] = payload.endTime.split(':').map(Number);
        // Check if the difference is exactly 1 hour and the minutes are the same
        if (endHour - startHour !== 1 || startMinute !== endMinute) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid time difference. The difference between startTime and endTime should be exactly one hour.');
        }
    }
    // Proceeding with the update if validation passes
    const result = yield Slots_model_1.Slot.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteSlotFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //checking if room exists
    const isSlotExists = yield Slots_model_1.Slot.isSlotExists(id);
    if (!isSlotExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Slot not found');
    }
    ;
    const result = yield Slots_model_1.Slot.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
exports.SlotsServices = {
    createSlotsIntoDB,
    getAvailableSlotsFromDB,
    updateSlotIntoDB,
    deleteSlotFromDB,
};
