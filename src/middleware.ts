import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['en', 'hi'],
  defaultLocale: 'en'
});
 
export const config = {
  // Skip all paths that should not be internationalized. This has been
  // corrected to the standard configuration.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
