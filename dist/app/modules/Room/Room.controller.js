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
exports.RoomController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const Room_service_1 = require("./Room.service");
const createRoom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Room_service_1.RoomServices.createRoomIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Room added successfully',
        data: result,
    });
}));
const getAllRoom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Room_service_1.RoomServices.getAllRoomFromDB();
    const isResult = result.length > 0;
    (0, sendResponse_1.default)(res, {
        statusCode: isResult ? http_status_1.default.OK : http_status_1.default.NOT_FOUND,
        success: isResult ? true : false,
        message: isResult ? 'Rooms retrieved successfully' : "No Data Found",
        data: result || [],
    });
}));
const getSingleRoom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Room_service_1.RoomServices.getSingleRoomFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: result ? http_status_1.default.OK : http_status_1.default.NOT_FOUND,
        success: result ? true : false,
        message: result ? 'Room retrieved successfully' : "No Data Found",
        data: result || [],
    });
}));
const updateRoom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Room_service_1.RoomServices.updateRoomIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Room updated successfully',
        data: result,
    });
}));
const deleteRoom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Room_service_1.RoomServices.deleteRoomFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Room deleted successfully",
        data: result,
    });
}));
exports.RoomController = {
    createRoom,
    getAllRoom,
    getSingleRoom,
    updateRoom,
    deleteRoom
};
