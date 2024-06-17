import { Spinner } from '@/components/ui/spinner';
import React from 'react';

const LoadingPage = () => {
  return (
    <div className='h-full w-full flex items-center justify-center bg-transparent'>
      <Spinner className='h-20 w-20' />
    </div>
  );
};

export default LoadingPage;
