"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _class = require("../class");

var _class2 = _interopRequireDefault(_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_class2.default.configure({
  "emitter": {
    "name": "Your company",
    "street_number": "10",
    "street_name": "wall street",
    "zip_code": "77340",
    "city": "New York",
    "phone": "01 00 00 00 00",
    "mail": "contact@website.com",
    "website": "www.website.com"
  },
  "global": {
    "logo": "http://placehold.it/230x70&text=logo",
    "order_reference_pattern": "$prefix{OR}$date{YYMM}$separator{-}$id{00000}",
    "invoice_reference_pattern": "$prefix{IN}$date{YYMM}$separator{-}$id{00000}",
    "order_template": "./static/order.pug",
    "order_note": "",
    "invoice_template": "./static/invoice.pug",
    "invoice_note": "",
    "date_format": "DD/MM/YYYY"
  }
});

exports.default = _class2.default;
//# sourceMappingURL=generator.js.map
