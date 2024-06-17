'use client';
import { admin } from '@/actions/admin';
import { RoleGate } from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/toast/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';

const AdminPage = () => {
  const onApiRouteClick = () => {
    fetch('/api/admin').then((res) => {
      if (res.ok) {
        toast.success('Allowed API Route!');
      } else {
        toast.error('Forbidden API Route!');
      }
    });
  };

  const onServerActionClick = async () => {
    const isAllowed = await admin();

    if (isAllowed) {
      toast.success('Allowed Server Action!');
    } else {
      toast.error('Forbidden Server Action!');
    }
  };

  return (
    <Card className='w-[calc(100%-2rem)]'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>🔐 Admin</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <RoleGate allowedRoles='ADMIN'>
          <FormSuccess message='You are allowed to access this content' />
        </RoleGate>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
