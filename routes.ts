// Define routes that are accessible to the public without authentication
export const publicRoutes = ['/', '/verify-email'];

// Define routes that are accessible for authentication
export const authRoutes = [
  '/login',
  '/register',
  '/error',
  '/reset',
  '/new-password',
];

// Prefix for authentication-related API endpoints
export const apiAuthPrefix = '/api/auth';

// Default route to redirect to after a successful login
export const DEFAULT_LOGIN_REDIRECT = '/settings';
