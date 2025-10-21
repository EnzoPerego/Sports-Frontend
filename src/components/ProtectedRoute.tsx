import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children
}) => {
  // Por enquanto, sempre permite acesso (Auth0 será configurado posteriormente)
  return <>{children}</>;
};
