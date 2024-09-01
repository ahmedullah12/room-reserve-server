"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidations = void 0;
const zod_1 = require("zod");
const createBookingSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string(),
        name: zod_1.z.string(),
        email: zod_1.z.string(),
        phone: zod_1.z.string(),
        address: zod_1.z.string(),
        roomName: zod_1.z.string(),
        time: zod_1.z.array(zod_1.z.string()),
        date: zod_1.z.string().refine((date) => {
            const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
            return regex.test(date);
        }, { message: 'Invalid date format.' }),
        slots: zod_1.z.array(zod_1.z.string()),
        room: zod_1.z.string(),
    }),
});
const updateBookingSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        roomName: zod_1.z.string().optional(),
        time: zod_1.z.array(zod_1.z.string()).optional(),
        date: zod_1.z.string().refine((date) => {
            const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
            return regex.test(date);
        }, { message: 'Invalid date format.' }).optional(),
        slots: zod_1.z.array(zod_1.z.string()).optional(),
        room: zod_1.z.string().optional(),
        totalAmount: zod_1.z.number().optional(),
    }).optional(),
});
exports.BookingValidations = {
    createBookingSchemaValidation,
    updateBookingSchemaValidation
};
