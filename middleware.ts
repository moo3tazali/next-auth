// Import authentication configuration and NextAuth library
import authConfig from '@/auth.config';
import NextAuth from 'next-auth';

// Import route constants
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes';

// Initialize NextAuth with the provided authentication configuration
const { auth } = NextAuth(authConfig);

// Export the middleware function that handles authentication and route protection
export default auth((req) => {
  // Extract the URL of the incoming request
  const { nextUrl } = req;

  // Check if the user is logged in by verifying the presence of an auth object in the request
  const isLoggedIn = !!req.auth;

  // Determine if the request is for an API authentication route
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  // Determine if the request is for a public route
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  // Determine if the request is for an authentication route (e.g., login, register, error)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // If the request is for an API authentication route, do nothing and proceed
  if (isApiAuthRoute) {
    return;
  }

  // If the request is for an authentication route and the user is logged in, redirect to the default login redirect route
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    // If the user is not logged in, do nothing and proceed
    return;
  }

  // If the user is not logged in and the request is not for a public route, redirect to the login page
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    // Redirect the user to the login page with the callback URL as the query parameter
    return Response.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // If none of the above conditions are met, do nothing and proceed
  return;
});

// Optionally, specify paths where the middleware should not be invoked
export const config = {
  // Matcher configuration to exclude certain paths from the middleware
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
