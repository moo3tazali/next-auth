import { ExtendedUser } from '@/next-auth';
import { Card, CardContent, CardHeader } from '../ui/card';
import { UserInfoContent } from './user-info-content';

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user, label }) => {
  return (
    <Card className='w-[calc(100%-2rem)] shadow-lg'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>{label}</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <UserInfoContent label='ID' info={user?.id} />
        <UserInfoContent label='Name' info={user?.name} />
        <UserInfoContent label='Email' info={user?.email} />
        <UserInfoContent label='Role' info={user?.role} />
        <UserInfoContent
          label='Two Factor Auth'
          info={user?.isTwoFactorEnabled ? 'ON' : 'OFF'}
        />
      </CardContent>
    </Card>
  );
};
