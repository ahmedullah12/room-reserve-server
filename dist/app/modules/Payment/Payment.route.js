"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = require("express");
const Payment_controller_1 = require("./Payment.controller");
const express_2 = __importDefault(require("express"));
const router = (0, express_1.Router)();
// Route
router.post('/confirmation', Payment_controller_1.PaymentController.confirmationController);
router.post('/stripe-webhook', express_2.default.raw({ type: 'application/json' }), Payment_controller_1.PaymentController.stripeWebhookController);
exports.PaymentRoutes = router;
