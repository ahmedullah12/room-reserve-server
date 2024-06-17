"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = require("../../middlewares/validateRequest");
const Room_validation_1 = require("./Room.validation");
const Room_controller_1 = require("./Room.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)("admin"), (0, validateRequest_1.validateRequest)(Room_validation_1.RoomValidations.createRoomSchemaValidations), Room_controller_1.RoomController.createRoom);
router.get("/", Room_controller_1.RoomController.getAllRoom);
router.get("/:id", Room_controller_1.RoomController.getSingleRoom);
router.put("/:id", (0, auth_1.default)("admin"), (0, validateRequest_1.validateRequest)(Room_validation_1.RoomValidations.updateRoomSchemaValidations), Room_controller_1.RoomController.updateRoom);
router.delete("/:id", (0, auth_1.default)("admin"), Room_controller_1.RoomController.deleteRoom);
exports.RoomRoutes = router;
