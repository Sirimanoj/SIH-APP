import {getRequestConfig} from 'next-intl/server';
 
// Can be imported from a shared config
const locales = ['en', 'hi'];
 
export default getRequestConfig(async ({locale}) => {
  // This is a simplified setup.
  // The middleware already ensures that the locale is valid.
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
