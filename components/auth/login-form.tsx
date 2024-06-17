'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useTransition } from 'react';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { LoginFormProps, LoginSchema } from '@/schemas';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/toast/form-error';
import { FormSuccess } from '@/components/toast/form-success';
import { login } from '@/actions/login';
import { useSearchParams } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const urlError = searchParams.get('error') === 'AccessDenied';

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormProps>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (urlError) setError('Email already in use with different provider!');
  }, [urlError]);

  const onSubmit = (data: LoginFormProps) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      login(data, callbackUrl)
        .then((data) => {
          if (data?.success) {
            form.reset();
            setSuccess(data?.success);
          }
          if (data?.error) {
            form.reset();
            setError(data?.error);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => {
          setError('Something went wrong, please try again!');
        });
    });
  };
  return (
    <CardWrapper
      headerLabel='Welcome back'
      backButtonLabel="Don't have an account?"
      backButtonHref='/register'
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            {showTwoFactor && (
              <FormField
                control={form.control}
                name='OTP'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold flex justify-center'>
                      Two Factor Code
                    </FormLabel>
                    <FormControl>
                      <div className='flex justify-center'>
                        <InputOTP disabled={isPending} maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </FormControl>
                    <FormDescription className='text-center'>
                      Please enter the one-time password sent to your Email.
                    </FormDescription>
                    <FormMessage className='text-sm font-semibold tracking-tighter' />
                  </FormItem>
                )}
              />
            )}

            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='email@example.com'
                          type='text'
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage className='text-sm font-semibold tracking-tighter' />
                    </FormItem>
                  )}
                />
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
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage className='text-sm font-semibold tracking-tighter' />
                    </FormItem>
                  )}
                />
                <Button
                  size='sm'
                  variant='link'
                  asChild
                  className='px-0 font-normal'
                >
                  <Link href='/reset'>Forgot password?</Link>
                </Button>
              </>
            )}
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button
            disabled={isPending || (showTwoFactor && !form.formState.isValid)}
            type='submit'
            className='w-full'
          >
            {isPending && <Spinner className='h-5 w-5 mr-2' />}{' '}
            {showTwoFactor ? 'Confirm' : 'Login'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
