import { z } from 'zod';

const userSchemaValidation = z.object({
  body: z.object({
    name: z.string({required_error: "Name is required"}),
    email: z.string({required_error: "Email is required"}),
    password: z.string({required_error: "Password is required"}),
    phone: z.string({required_error: "Phone is required"}),
    role: z.enum(['admin', 'user'] as [string, ...string[]]),
    address: z.string({required_error: "Address is required", }),
  }),
});

export const UserValidations = {
  userSchemaValidation,
};
