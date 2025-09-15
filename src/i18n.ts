import {getRequestConfig} from 'next-intl/server';
 
// Can be imported from a shared config
const locales = ['en', 'hi'];
 
export default getRequestConfig(async ({locale}) => {
  // No need to validate locale here, middleware does that
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});