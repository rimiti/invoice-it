import i18n from 'i18n'

i18n.configure({
    locales: ['en', 'fr'],
    directory: `${__dirname}/../config/locales`,
    defaultLocale: 'en',
    logDebugFn: (message) => console.log('debug', message),
    logWarnFn: (message) => console.warn('warn', message),
    logErrorFn: (message) => console.error('error', message)
})

export default i18n
