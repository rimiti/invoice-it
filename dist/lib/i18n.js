'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _i18nFactory = require('i18n-factory');

var _i18nFactory2 = _interopRequireDefault(_i18nFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var i18n = _i18nFactory2.default.create();

i18n.configure({
  locales: ['en', 'fr'],
  directory: __dirname + '/../config/locales',
  defaultLocale: 'en',
  logWarnFn: function logWarnFn(message) {
    return console.warn('warn', message);
  },
  logErrorFn: function logErrorFn(message) {
    return console.error('error', message);
  }
});

exports.default = i18n;
//# sourceMappingURL=i18n.js.map
