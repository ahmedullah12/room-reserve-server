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
exports.PaymentServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const path_1 = require("path");
const fs_1 = require("fs");
const Payment_utils_1 = require("./Payment.utils");
const Booking_model_1 = require("../Booking/Booking.model");
const confirmationService = (transactionId, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyResponse = yield (0, Payment_utils_1.verifyPayment)(transactionId);
    let result;
    let message = "";
    if (verifyResponse && verifyResponse.pay_status === "Successful") {
        result = yield Booking_model_1.Booking.findOneAndUpdate({ _id: bookingId }, // Ensure you use the correct field for the ID
        { isConfirmed: "confirmed" }, { new: true });
        message = "Successfully Paid!!!";
    }
    else {
        message = "Payment Failed!!!";
    }
    const filePath = (0, path_1.join)(__dirname, "../../../../public/confirmation.html");
    let template = (0, fs_1.readFileSync)(filePath, "utf-8");
    // Replace placeholders with actual data
    template = template.replace("{{message}}", message);
    template = template.replace("{{bookingId}}", bookingId);
    return template;
});
exports.PaymentServices = {
    confirmationService,
};
