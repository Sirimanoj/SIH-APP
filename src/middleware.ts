
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

  // If the user is logged in and tries to access an auth page, redirect to home.
  // Note: This logic is now handled client-side in AuthProvider for better UX,
  // but we keep a server-side check as a fallback.
  if (cookie && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

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
