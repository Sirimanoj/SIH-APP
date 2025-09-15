import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['en', 'hi'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/dashboard': '/dashboard',
    '/chatbot': '/chatbot',
    '/resources': '/resources',
    '/community': '/community',
    '/book-session': '/book-session',
    '/profile': '/profile',
  }
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ]
};