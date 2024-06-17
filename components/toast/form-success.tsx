import { CheckCircleIcon } from 'lucide-react';

interface FormSuccessProps {
  message: string;
}

export const FormSuccess: React.FC<FormSuccessProps> = ({ message }) => {
  if (!message) {
    return null;
  }
  return (
    <div className='p-3 bg-emerald-500/15 rounded-md flex items-center gap-x-2 text-sm text-emerald-500'>
      <CheckCircleIcon className='h-4 w-4' />
      <p>{message}</p>
    </div>
  );
};
