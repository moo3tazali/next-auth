'use client';
import { useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';

import { settings } from '@/actions/settings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { SettingsFormProps, SettingsSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCurrentUser } from '@/hooks/use-current-user';
import { FormError } from '@/components/toast/form-error';
import { FormSuccess } from '@/components/toast/form-success';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserRole } from '@prisma/client';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';

const SettingsPage = () => {
  const { update } = useSession();
  const user = useCurrentUser();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();
  const form = useForm<SettingsFormProps>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const OnSubmit = (values: SettingsFormProps) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data?.error) {
            setError(data?.error);
          }
          if (data?.success) {
            update();
            setSuccess(data?.success);
          }
        })
        .catch(() => setError('Something went wrong, please try again!'));
    });
  };

  return (
    <Card className='w-[calc(100%-2rem)] max-w-[400px]'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className='space-y-6' onSubmit={form.handleSubmit(OnSubmit)}>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='John Doe'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>Update your name</FormDescription>
                  </FormItem>
                )}
              />
              {!user?.isOAuth && (
                <>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='lJt9I@example.com'
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>Update your email</FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='password'
                            placeholder='******'
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>
                          Enter your current password
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='newPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='password'
                            placeholder='******'
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>
                          Enter your new password
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </>
              )}

              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a role' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                    <FormDescription>Select your role</FormDescription>
                  </FormItem>
                )}
              />
              {!user?.isOAuth && (
                <FormField
                  control={form.control}
                  name='isTwoFactorEnabled'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                      <div className='space-y-0.5'>
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable or disable two factor authentication
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type='submit' className='w-full'>
              {isPending && <Spinner className='w-5 h-5 mr-2' />} Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
