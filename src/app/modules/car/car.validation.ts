import { z } from 'zod';

const createCarZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'First name is required',
    }),
    specifications: z.object({
      gear: z.enum(['auto', 'manual'] as [string, ...string[]]),
      seats: z.number({
        required_error: 'seat number is required',
      }),
      others: z.string({
        required_error: 'Others specifications is required',
      }),
    }),
    category: z.string({
      required_error: 'category is required',
    }),
    status: z.enum(['rented', 'available'] as [string, ...string[]]),
    condition: z.enum(['new', 'used'] as [string, ...string[]]),
    location: z.enum(['Address-1', 'Address-2', 'Address-3', 'Address-4'] as [
      string,
      ...string[]
    ]),
    price: z.number({
      required_error: 'Price is required',
    }),
  }),
});
const updateCarZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    specifications: z.object({
      gear: z.enum(['auto', 'manual'] as [string, ...string[]]).optional(),
      seats: z.number().optional(),
      others: z.string().optional(),
    }),
    category: z.string().optional(),
    status: z.enum(['rented', 'available'] as [string, ...string[]]).optional(),
    condition: z.enum(['new', 'used'] as [string, ...string[]]).optional(),
    location: z.enum(['Address-1', 'Address-2', 'Address-3', 'Address-4'] as [
      string,
      ...string[]
    ]).optional(),
    price: z.number().optional(),
  }),
});

export const CarValidation = {
  createCarZodSchema,
  updateCarZodSchema,
};
