import { z } from 'zod';

const createBookingSchemaValidation = z.object({
  body: z.object({
    userId: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    roomName: z.string(),
    time: z.array(z.string()),
    date: z.string().refine(
      (date) => {
        const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        return regex.test(date);
      },
      { message: 'Invalid date format.' },
    ),
    slots: z.array(z.string()),
    room: z.string(),
  }),
});
const updateBookingSchemaValidation = z.object({
  body: z.object({
    userId: z.string().optional(),
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    roomName: z.string().optional(),
    time: z.array(z.string()).optional(),
    date: z.string().refine(
      (date) => {
        const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        return regex.test(date);
      },
      { message: 'Invalid date format.' },
    ).optional(),
    slots: z.array(z.string()).optional(),
    room: z.string().optional(),
    totalAmount: z.number().optional(),
  }).optional(),
});


export const BookingValidations = {
    createBookingSchemaValidation,
    updateBookingSchemaValidation
}