import { z } from 'zod';

const createSlotsSchemaValidation = z.object({
  body: z.object({
    room: z.string(),
    date: z.string().refine(
      (date) => {
        const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        return regex.test(date);
      },
      { message: 'Invalid date format.' },
    ),
    startTime: z.string().refine(
      (time) => {
        const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(time);
      },
      { message: "Invalid time format, expected 'HH-MM' in 24 hours format" },
    ),
    endTime: z.string().refine(
      (time) => {
        const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(time);
      },
      { message: "Invalid time format, expected 'HH-MM' in 24 hours format" },
    ),
  }),
});
const updateSlotsSchemaValidation = z.object({
  body: z.object({
    room: z.string().optional(),
    date: z.string().refine(
      (date) => {
        const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        return regex.test(date);
      },
      { message: 'Invalid date format.' },
    ).optional(),
    startTime: z.string().refine(
      (time) => {
        const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(time);
      },
      { message: "Invalid time format, expected 'HH-MM' in 24 hours format" },
    ).optional(),
    endTime: z.string().refine(
      (time) => {
        const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(time);
      },
      { message: "Invalid time format, expected 'HH-MM' in 24 hours format" },
    ).optional(),
  }),
});

export const SlotsValidations = {
  createSlotsSchemaValidation,
  updateSlotsSchemaValidation
};
