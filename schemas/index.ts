import { UserRole } from '@prisma/client';
import * as z from 'zod';

// Login
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid Email' }),
  password: z.string().min(1, { message: 'Password is required' }),
  OTP: z.optional(
    z.string().min(6, { message: 'OTP must contain at least 6 digit(s)' })
  ),
});

export type LoginFormProps = z.infer<typeof LoginSchema>;

// Register
export const RegisterSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid Email' }),
  password: z
    .string()
    .min(6, { message: 'Password must contain at least 6 character(s)' }),
});

export type RegisterFormProps = z.infer<typeof RegisterSchema>;

// Forgot Password
export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid Email' }),
});

export type ForgotPasswordFormProps = z.infer<typeof ForgotPasswordSchema>;

// new password
export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password must contain at least 6 character(s)' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type NewPasswordFormProps = z.infer<typeof NewPasswordSchema>;

export const SettingsSchema = z
  .object({
    name: z.optional(z.string().min(1, { message: 'Name is required' })),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.USER, UserRole.ADMIN]),
    email: z.optional(z.string().email({ message: 'Invalid Email' })),
    password: z.optional(z.string()),
    newPassword: z.optional(
      z.string().min(6, { message: 'Password is required a min 6 character' })
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      if (!data.password && data.newPassword) {
        return false;
      }
      return true;
    },
    { message: 'Current password and new password are required' }
  );

export type SettingsFormProps = z.infer<typeof SettingsSchema>;
