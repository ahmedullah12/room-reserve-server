import { z } from 'zod';

const createBookingSchemaValidation = z.object({
  body: z.object({
    date: z.string().refine(
      (date) => {
        const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        return regex.test(date);
      },
      { message: 'Invalid date format.' },
    ),
    slots: z.array(z.string()),
    room: z.string(),
    user: z.string(),
  }),
});
const updateBookingSchemaValidation = z.object({
  body: z.object({
    date: z.string().refine(
      (date) => {
        const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        return regex.test(date);
      },
      { message: 'Invalid date format.' },
    ).optional(),
    slots: z.array(z.string()).optional(),
    room: z.string().optional(),
    user: z.string().optional(),
    totalAmount: z.number().optional(),
  }).optional(),
});


export const BookingValidations = {
    createBookingSchemaValidation,
    updateBookingSchemaValidation
}