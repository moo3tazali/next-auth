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
import { RegisterFormProps, RegisterSchema } from '@/schemas';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/toast/form-error';
import { FormSuccess } from '@/components/toast/form-success';
import { register } from '@/actions/register';

export const RegisterForm = () => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const form = useForm<RegisterFormProps>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: RegisterFormProps) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      register(data).then((data) => {
        if (data.error) {
          setError(data?.error);
        }

        if (data?.success) {
          setSuccess(data.success);
        }
      });
    });
  };
  return (
    <CardWrapper
      headerLabel='Join us now'
      backButtonLabel='Already have an account?'
      backButtonHref='/login'
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Your name'
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
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button disabled={isPending} type='submit' className='w-full'>
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
