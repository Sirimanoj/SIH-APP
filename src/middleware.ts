
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = request.cookies.get('firebase-auth-token');

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  
  // If there's no auth token and the user is trying to access a protected page,
  // redirect them to the login page.
  if (!cookie && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // The logic to redirect an authenticated user away from an auth page
  // is now handled entirely on the client-side in the AuthProvider.
  // This simplifies the middleware's responsibility.

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
