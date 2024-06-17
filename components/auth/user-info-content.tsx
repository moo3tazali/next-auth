import { cn } from '@/lib/utils';
import React from 'react';

interface UserInfoContentProps {
  label: string;
  info: string | undefined | null;
}

export const UserInfoContent: React.FC<UserInfoContentProps> = ({
  label,
  info,
}) => {
  return (
    <div className='flex items-center justify-between flex-row rounded-lg border p-3 shadow-sm'>
      <p className='text-sm font-medium'>{label}</p>
      <p
        className={cn(
          'text-xs truncate max-w-[180px] font-mono p-1 bg-slate-100 rounded-md',
          info === 'ON' && 'bg-emerald-500 text-white',
          info === 'OFF' && 'bg-red-500 text-white'
        )}
      >
        {info}
      </p>
    </div>
  );
};
