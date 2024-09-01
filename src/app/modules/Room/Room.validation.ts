import { z } from 'zod';

const createRoomSchemaValidations = z.object({
  body: z.object({
    name: z.string(),
    roomNo: z.number(),
    floorNo: z.number(),
    capacity: z.number(),
    images: z.array(z.string()),
    pricePerSlot: z.number(),
    amenities: z.array(z.string()),
  }),
});

const updateRoomSchemaValidations = z.object({
  body: z.object({
    name: z.string().optional(),
    roomNo: z.number().optional(),
    floorNo: z.number().optional(),
    capacity: z.number().optional(),
    images: z.array(z.string()).optional(),
    pricePerSlot: z.number().optional(),
    amenities: z.array(z.string()).optional(),
  }),
});


export const RoomValidations = {
    createRoomSchemaValidations,
    updateRoomSchemaValidations
}