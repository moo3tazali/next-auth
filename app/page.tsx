import { LoginButton } from '@/components/auth/login-btn';
import { Button } from '@/components/ui/button';
import { currentUser } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});
export default async function Home() {
  const user = await currentUser();
  return (
    <main className='flex flex-col h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
      <div className='space-y-6 text-center'>
        <h1
          className={cn(
            'text-6xl font-semibold text-white drop-shadow-md',
            font.className
          )}
        >
          🗝️ Auth
        </h1>
        <p className='text-white text-lg'>A simple authentication service</p>
        <div>
          <LoginButton mode={user ? 'redirect' : 'modal'} asChild={!user}>
            <Button variant='secondary' size='lg'>
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
