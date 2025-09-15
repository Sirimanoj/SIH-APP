
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Bypassing all authentication checks for now.
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
     *
     * THIS MATCHER IS EFFECTIVELY DISABLED BY THE EMPTY MIDDLEWARE FUNCTION ABOVE.
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
