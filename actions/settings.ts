'use server';

import bcrypt from 'bcryptjs';
import { getUserByEmail, getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { SettingsFormProps, SettingsSchema } from '@/schemas';
import { hashPassword } from '@/lib/utils';

export const settings = async (values: SettingsFormProps) => {
  const validatedFields = SettingsSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const user = await currentUser();

  if (!user || !user.id) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && user.email !== values.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already exists' };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: 'Confirmation email sent!' };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatch) {
      return { error: 'Invalid password' };
    }

    const hashedPassword = await hashPassword(values.newPassword);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...values,
    },
  });

  return { success: 'Settings updated!' };
};
