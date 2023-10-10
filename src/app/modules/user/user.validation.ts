import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    phoneNumber: z.string({
      required_error: 'phoneNumber is required',
    }),
    role: z.enum(['buyer', 'seller'] as [string, ...string[]]),
    password: z.string({
      required_error: 'password is required',
    }),

    address: z.string({
      required_error: 'address is required',
    }),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});
const updateUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }).optional(),
    phoneNumber: z.string().optional(),
    role: z.enum(['buyer', 'seller'] as [string, ...string[]]).optional(),
    password: z.string().optional(),
    address: z.string().optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema
};
