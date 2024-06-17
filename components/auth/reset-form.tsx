'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ForgotPasswordSchema, ForgotPasswordFormProps } from '@/schemas';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/toast/form-error';
import { FormSuccess } from '@/components/toast/form-success';
import { Spinner } from '@/components/ui/spinner';
import { resetPassword } from '@/actions/reset-password';

export const ResetForm = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<ForgotPasswordFormProps>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: 'test@gmail.com',
    },
  });

  const onSubmit = (data: ForgotPasswordFormProps) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      resetPassword(data).then((data) => {
        if (data?.success) setSuccess(data?.success);
        if (data?.error) setError(data?.error);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel='Forgot your password?'
      backButtonLabel='Back to Login'
      backButtonHref='/login'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
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
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button disabled={isPending} type='submit' className='w-full'>
            {isPending ? <Spinner className='h-8 w-8' /> : 'Send reset email'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
