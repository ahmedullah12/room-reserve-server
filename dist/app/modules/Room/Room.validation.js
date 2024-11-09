"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomValidations = void 0;
const zod_1 = require("zod");
const createRoomSchemaValidations = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        roomNumber: zod_1.z.number(),
        floorNo: zod_1.z.number(),
        capacity: zod_1.z.number(),
        images: zod_1.z.array(zod_1.z.string()),
        pricePerSlot: zod_1.z.number(),
        amenities: zod_1.z.array(zod_1.z.string()),
    }),
});
const updateRoomSchemaValidations = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        roomNumber: zod_1.z.number().optional(),
        floorNo: zod_1.z.number().optional(),
        capacity: zod_1.z.number().optional(),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        pricePerSlot: zod_1.z.number().optional(),
        amenities: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.RoomValidations = {
    createRoomSchemaValidations,
    updateRoomSchemaValidations
};
