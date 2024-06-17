'use client';

import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@prisma/client';
import { FormError } from '../toast/form-error';

interface RoleGateProps {
  allowedRoles: UserRole;
  children: React.ReactNode;
}

export const RoleGate: React.FC<RoleGateProps> = ({
  allowedRoles,
  children,
}) => {
  const role = useCurrentRole();

  if (role !== allowedRoles) {
    return (
      <FormError message='You do not have permission to view this content' />
    );
  }
  return <>{children}</>;
};
