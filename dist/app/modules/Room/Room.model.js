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
exports.Room = void 0;
const mongoose_1 = require("mongoose");
const roomSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    roomNumber: { type: Number, required: true, unique: true },
    floorNo: { type: Number, required: true },
    capacity: { type: Number, required: true },
    pricePerSlot: { type: Number, required: true },
    images: { type: [String], required: true },
    amenities: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true
});
// roomSchema.pre('find', async function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });
// roomSchema.pre('findOne', async function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });
// have to add isRoomExists and isRoomDeleted
roomSchema.statics.isRoomExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const room = yield exports.Room.findById(id);
        return room;
    });
};
roomSchema.statics.isRoomDeleted = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const room = yield exports.Room.findById(id);
        return !!room && !room.isDeleted;
    });
};
roomSchema.statics.roomPricePerSlot = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const room = yield exports.Room.findById(id);
        if (room) {
            return room.pricePerSlot;
        }
    });
};
exports.Room = (0, mongoose_1.model)('Room', roomSchema);
