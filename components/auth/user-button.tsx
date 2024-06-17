'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FaUser } from 'react-icons/fa';
import { useCurrentUser } from '@/hooks/use-current-user';
import { LogoutButton } from './logout-button';
import { ExitIcon } from '@radix-ui/react-icons';

export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className='w-20 h-20'>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className='bg-secondary'>
            <FaUser className='text-primary w-10 h-10' />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-40'>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className='w-4 h-4 mr-2' />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
