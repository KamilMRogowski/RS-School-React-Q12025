import { z } from 'zod';
import { store } from '../store/store';

const countries = store.getState().countries;

export const FormValidation = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .regex(/[A-Z]/, { message: 'Name must start with a capital letter' }),
  age: z
    .string()
    .min(1, { message: 'Age is required' })
    .transform((val) => parseInt(val))
    .pipe(z.number().positive({ message: 'Age must be a positive number' })),
  email: z.string().email({ message: 'Invalid email address' }),
  passwordForm: z
    .object({
      password: z
        .string()
        .refine(
          (value) => /[a-z]/.test(value),
          'Password must contain at least 1 lowercase letter.'
        )
        .refine(
          (value) => /[A-Z]/.test(value),
          'Password must contain at least 1 uppercase letter.'
        )
        .refine(
          (value) => /[0-9]/.test(value),
          'Password must contain at least 1 number.'
        )
        .refine(
          (value) => /[\W_]/.test(value),
          'Password must contain at least 1 special character.'
        ),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
  gender: z.enum(['male', 'female', 'other'], {
    message: 'You must select a gender',
  }),
  picture: z.union([
    z
      .instanceof(FileList)
      .transform((fileList) => fileList.item(0))
      .superRefine((file, ctx) => {
        if (file === null) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please select a file',
          });
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'File size must be less than 5MB',
          });
        }
      }),
    z.string(),
  ]),
  terms: z.boolean().refine((val) => val, {
    message: 'You must agree to the terms and conditions',
  }),
  country: z.string().refine((val) => countries.includes(val), {
    message: 'Please select a valid country',
  }),
});

export type FormData = Omit<z.infer<typeof FormValidation>, 'picture'> & {
  picture: File | string | null;
};
