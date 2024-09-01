import { z } from 'zod';

const createUserSchemaValidation = z.object({
  body: z.object({
    name: z.string({required_error: "Name is required"}),
    email: z.string({required_error: "Email is required"}),
    password: z.string({required_error: "Password is required"}),
    phone: z.string({required_error: "Phone is required"}),
    role: z.enum(['admin', 'user'] as [string, ...string[]]),
    address: z.string({required_error: "Address is required", }),
  }),
});

const loginSchemaValidation = z.object({
  body: z.object({
      email: z.string({required_error: "Email is required"}),
      password: z.string({required_error: "Password is required"})
  })
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

export const AuthValidations = {
  createUserSchemaValidation,
  loginSchemaValidation,
  refreshTokenValidationSchema
};
