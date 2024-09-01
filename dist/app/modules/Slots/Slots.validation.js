"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotsValidations = void 0;
const zod_1 = require("zod");
const createSlotsSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        room: zod_1.z.string(),
        date: zod_1.z.string().refine((date) => {
            const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
            return regex.test(date);
        }, { message: 'Invalid date format.' }),
        startTime: zod_1.z.string().refine((time) => {
            const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            return regex.test(time);
        }, { message: "Invalid time format, expected 'HH-MM' in 24 hours format" }),
        endTime: zod_1.z.string().refine((time) => {
            const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            return regex.test(time);
        }, { message: "Invalid time format, expected 'HH-MM' in 24 hours format" }),
    }),
});
const updateSlotsSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        room: zod_1.z.string().optional(),
        date: zod_1.z.string().refine((date) => {
            const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
            return regex.test(date);
        }, { message: 'Invalid date format.' }).optional(),
        startTime: zod_1.z.string().refine((time) => {
            const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            return regex.test(time);
        }, { message: "Invalid time format, expected 'HH-MM' in 24 hours format" }).optional(),
        endTime: zod_1.z.string().refine((time) => {
            const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            return regex.test(time);
        }, { message: "Invalid time format, expected 'HH-MM' in 24 hours format" }).optional(),
    }),
});
exports.SlotsValidations = {
    createSlotsSchemaValidation,
    updateSlotsSchemaValidation
};
