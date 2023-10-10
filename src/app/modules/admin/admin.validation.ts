import { z } from 'zod';

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string(),
    role: z.literal('admin'),
    name: z.object({
      firstName: z.string(),
      lastName: z.string(),
    }),
    phoneNumber: z.string().regex(/^\d{11}$/),
    address: z.string(),
  }),
});

const adminLoginZodSchema = z.object({
  body: z.object({
    phoneNumber: z
      .string({
        required_error: 'Phone Number is invalid or undefined',
      })
      .regex(/^\d{11}$/),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

export const adminValidation = {
  createAdminZodSchema,
  adminLoginZodSchema,
};
