"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotsRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const Slots_validation_1 = require("./Slots.validation");
const Slots_controller_1 = require("./Slots.controller");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)("admin"), (0, validateRequest_1.validateRequest)(Slots_validation_1.SlotsValidations.createSlotsSchemaValidation), Slots_controller_1.SlotsController.createSlots);
router.get("/availability", Slots_controller_1.SlotsController.getAvailableSlots);
exports.SlotsRoutes = router;
