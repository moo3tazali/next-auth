'use server';

import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';
import { ForgotPasswordSchema, ForgotPasswordFormProps } from '@/schemas';

export const resetPassword = async (data: ForgotPasswordFormProps) => {
  const validatedFields = ForgotPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Invalid email!' };
  }

  const { email } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return { error: 'Email not found' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return {
    success: 'Reset email sent!',
  };
};
