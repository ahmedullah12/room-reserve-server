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
exports.PaymentController = void 0;
const Payment_service_1 = require("./Payment.service");
const Booking_model_1 = require("../Booking/Booking.model");
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
const Booking_constant_1 = require("../Booking/Booking.constant");
const stripe = new stripe_1.default(config_1.default.stripe_secret_key);
const confirmationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId, bookingId } = req.query;
    const result = yield Payment_service_1.PaymentServices.confirmationService(transactionId, bookingId);
    res.send(result);
});
const stripeWebhookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const webhookSecret = config_1.default.stripe_webhook_key;
    const requestPayload = req.body;
    const requestPayloadString = JSON.stringify(requestPayload, null, 2);
    const requestHeader = stripe.webhooks.generateTestHeaderString({
        payload: requestPayloadString,
        secret: webhookSecret,
    });
    try {
        const event = stripe.webhooks.constructEvent(requestPayloadString, requestHeader, webhookSecret);
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            yield Booking_model_1.Booking.findByIdAndUpdate((_a = session.metadata) === null || _a === void 0 ? void 0 : _a.bookingId, {
                isConfirmed: session.payment_status === 'paid'
                    ? Booking_constant_1.ConfirmState.confirmed
                    : Booking_constant_1.ConfirmState.unconfirmed,
            });
        }
        res.status(200).send(`Webhook received!`);
    }
    catch (error) {
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
});
exports.PaymentController = {
    confirmationController,
    stripeWebhookController,
};
