import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'First name is required',
    }),
    phoneNumber: z.string({
      required_error: 'phoneNumber is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    role: z.enum(['customer'] as [string, ...string[]]),
    password: z.string({
      required_error: 'password is required',
    }),
    address: z.string({
      required_error: 'address is required',
    })
  }),
});
const updateUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
    role:z.enum(['customer']  as [string, ...string[]]).optional(),
    password: z.string().optional(),
    address: z.string().optional()
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema
};
