'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Spinner } from '@/components/ui/spinner';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { newVerification } from '@/actions/new-verification';
import { FormError } from '@/components/toast/form-error';
import { FormSuccess } from '@/components/toast/form-success';

export const NewVerificationForm = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('No token provided!');
      return;
    }
    newVerification(token)
      .then((data) => {
        if (data?.success) {
          setSuccess(data?.success);
          router.push('/login');
        }
        if (data?.error) setError(data?.error);
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [token, router]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel='Confirming your verification'
      backButtonLabel='Back to login'
      backButtonHref='/login'
    >
      <div className='flex items-center w-full justify-center'>
        {!success && !error && <Spinner className='text-black w-8 h-8' />}
        <FormSuccess message={success} />

        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};
