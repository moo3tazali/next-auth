import { SessionProvider } from 'next-auth/react';
import { Navbar } from './_components/navbar';
import { auth } from '@/auth';
import { UserButton } from '@/components/auth/user-button';

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className='py-10 min-h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
        <Navbar />
        <UserButton />
        {children}
      </div>
    </SessionProvider>
  );
};

export default ProtectedLayout;
