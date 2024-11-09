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
exports.RoomServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const Room_model_1 = require("./Room.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const searchableFields = ['name', 'roomNo', 'floorNo'];
const createRoomIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Room_model_1.Room.create(payload);
    return result;
});
const getAllRoomFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const roomQuery = new QueryBuilder_1.default(Room_model_1.Room.find(), query)
        .search(searchableFields)
        .filter()
        .sort()
        .paginate();
    const result = yield roomQuery.modelQuery;
    const meta = yield roomQuery.countTotal();
    return {
        result,
        meta
    };
});
const getSingleRoomFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Room_model_1.Room.findById(id);
    return result;
});
const updateRoomIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //checking if room exists
    const isRoomExists = yield Room_model_1.Room.isRoomExists(id);
    if (!isRoomExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room not found');
    }
    const isRoomDeleted = yield Room_model_1.Room.isRoomDeleted(id);
    if (!isRoomDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room not found');
    }
    const result = yield Room_model_1.Room.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteRoomFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //checking if room exists
    const isRoomExists = yield Room_model_1.Room.isRoomExists(id);
    if (!isRoomExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room not found');
    }
    const isRoomDeleted = yield Room_model_1.Room.isRoomDeleted(id);
    if (!isRoomDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room not found');
    }
    const result = yield Room_model_1.Room.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
exports.RoomServices = {
    createRoomIntoDB,
    getAllRoomFromDB,
    getSingleRoomFromDB,
    updateRoomIntoDB,
    deleteRoomFromDB,
};
