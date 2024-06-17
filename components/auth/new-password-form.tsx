'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Spinner } from '@/components/ui/spinner';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { FormError } from '@/components/toast/form-error';
import { FormSuccess } from '@/components/toast/form-success';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewPasswordFormProps, NewPasswordSchema } from '@/schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { setNewPassword } from '@/actions/set-new-password';

export const NewPasswordForm = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token');

  const form = useForm<NewPasswordFormProps>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (!token) {
      setError('No token provided!');
    }
  }, [token]);

  const onSubmit = (data: NewPasswordFormProps) => {
    setError('');
    setSuccess('');

    if (token) {
      startTransition(() => {
        setNewPassword(data, token)
          .then((message) => {
            if (message?.success) {
              setSuccess(message?.success);
              router.push('/login');
            }
            if (message?.error) setError(message?.error);
          })
          .catch(() => {
            setError('Something went wrong!');
          });
      });
    }
  };

  return (
    <CardWrapper
      headerLabel='Enter a new password'
      backButtonLabel='Back to login'
      backButtonHref='/login'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='******'
                      type='password'
                      disabled={isPending || !token}
                    />
                  </FormControl>
                  <FormMessage className='text-sm font-semibold tracking-tighter' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='******'
                      type='password'
                      disabled={isPending || !token}
                    />
                  </FormControl>
                  <FormMessage className='text-sm font-semibold tracking-tighter' />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button
            disabled={isPending || !token}
            type='submit'
            className='w-full'
          >
            {isPending ? <Spinner className='h-8 w-8' /> : 'Reset Password'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
