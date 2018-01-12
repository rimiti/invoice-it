import i18nFactory from 'i18n-factory';

const i18n = i18nFactory.create();

i18n.configure({
  locales: ['en', 'fr'],
  directory: `${__dirname}/../config/locales`,
  defaultLocale: 'en',
  logWarnFn: (message) => console.warn('warn', message),
  logErrorFn: (message) => console.error('error', message),
});


export default i18n;
