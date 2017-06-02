'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _i18n = require('i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_i18n2.default.configure({
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

exports.default = _i18n2.default;
//# sourceMappingURL=i18n.js.map
