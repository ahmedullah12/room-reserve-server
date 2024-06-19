"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidations = void 0;
const zod_1 = require("zod");
const createBookingSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string().refine((date) => {
            const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
            return regex.test(date);
        }, { message: 'Invalid date format.' }),
        slots: zod_1.z.array(zod_1.z.string()),
        room: zod_1.z.string(),
        user: zod_1.z.string(),
    }),
});
exports.BookingValidations = {
    createBookingSchemaValidation,
};
