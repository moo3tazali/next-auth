'use client';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

import { useRouter } from 'next/navigation';
import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { LoginForm } from './login-form';

export const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  mode = 'redirect',
  asChild,
}) => {
  const router = useRouter();

  const onClick = () => {
    router.push('/login');
  };

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className='p-0 w-auto bg-transparent border-none'>
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className='cursor-pointer'>
      {children}
    </span>
  );
};
