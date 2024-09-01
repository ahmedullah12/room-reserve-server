"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = require("express");
const Payment_controller_1 = require("./Payment.controller");
const router = (0, express_1.Router)();
// Route
router.post("/confirmation", Payment_controller_1.PaymentController.confirmationController);
exports.PaymentRoutes = router;
