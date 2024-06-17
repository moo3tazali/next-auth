'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { RegisterFormProps, RegisterSchema } from '@/schemas';
import { hashPassword } from '@/lib/utils';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (values: RegisterFormProps) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await hashPassword(password);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'User already exists' };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Confirmation email sent!' };
};
