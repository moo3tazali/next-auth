'use server';

import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { NewPasswordFormProps, NewPasswordSchema } from '@/schemas';
import { hashPassword } from '@/lib/utils';

export const setNewPassword = async (
  data: NewPasswordFormProps,
  token?: string | null
) => {
  if (!token) {
    return { error: 'No token provided!' };
  }

  const validatedData = NewPasswordSchema.safeParse(data);
  if (!validatedData.success) {
    return { error: 'Invalid fields!' };
  }
  const { password } = validatedData.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: 'Invalid token!' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: 'Token has expired!' };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: 'Email does not exist!' };
  }

  if (existingUser.password) {
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (passwordMatch) {
      return { error: 'New password cannot be the same as old password!' };
    }
  }

  const hashedPassword = await hashPassword(password);
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: 'Password updated successfully' };
};
