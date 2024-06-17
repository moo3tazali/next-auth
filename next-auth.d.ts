import type { DefaultSession } from 'next-auth';
import {} from 'next-auth/jwt';

import { UserRole } from '@prisma/client';

export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
};

declare module 'next-auth' {
  interface Session {
    user: {
      role: UserRole;
      isTwoFactorEnabled: boolean;
      isOAuth: boolean;
    } & DefaultSession['user'];
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    role?: UserRole;
    isTwoFactorEnabled?: boolean;
    isOAuth?: boolean;
  }
}
