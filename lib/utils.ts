import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import bcrypt from 'bcryptjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addSpaceBeforeCapital(str: string | null) {
  if (str) {
    return str.replace(/([A-Z])/g, ' $1').trim();
  } else return '';
}

export async function hashPassword(password: string) {
  // Number of salt rounds (cost factor)
  // This defines the computational complexity of the hashing algorithm.
  // In this case, 10 means 2^10 iterations.
  const saltRounds = 10;
  // Generate a hashed version of the password with the specified salt rounds
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}
