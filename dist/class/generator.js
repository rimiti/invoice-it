'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _common = require('./common');

var _common2 = _interopRequireDefault(_common);

var _recipient = require('./recipient');

var _recipient2 = _interopRequireDefault(_recipient);

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _pug = require('pug');

var _pug2 = _interopRequireDefault(_pug);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _i18n = require('../lib/i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _htmlPdf = require('html-pdf');

var _htmlPdf2 = _interopRequireDefault(_htmlPdf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Generator = function (_Common) {
  _inherits(Generator, _Common);

  function Generator(config) {
    _classCallCheck(this, Generator);

    var _this = _possibleConstructorReturn(this, (Generator.__proto__ || Object.getPrototypeOf(Generator)).call(this));

    _this._recipient = config.recipient ? new _recipient2.default(config.recipient) : new _recipient2.default();
    _this._emitter = config.emitter ? new _emitter2.default(config.emitter) : new _emitter2.default();
    _this._total_exc_taxes = 0;
    _this._total_taxes = 0;
    _this._total_inc_taxes = 0;
    _this._article = [];
    _this.hydrate(config.global, _this._itemsToHydrate());
    return _this;
  }

  _createClass(Generator, [{
    key: 'deleteArticles',


    /**
     * @description Reinitialize article attribute
     */
    value: function deleteArticles() {
      this._total_inc_taxes = 0;
      this._total_taxes = 0;
      this._total_exc_taxes = 0;
      this._article = [];
    }

    /**
     * @description Check article structure and data
     * @param article
     * @private
     */

  }, {
    key: '_checkArticle',
    value: function _checkArticle(article) {
      if (!article.hasOwnProperty('description')) throw new Error('Description is attribute is missing');
      if (!article.hasOwnProperty('tax')) throw new Error('Tax attribute is missing');
      if (!this.isNumeric(article.tax)) throw new Error('Tax attribute have to be a number');
      if (!article.hasOwnProperty('price')) throw new Error('Price attribute is missing');
      if (!this.isNumeric(article.price)) throw new Error('Price attribute have to be a number');
      if (!article.hasOwnProperty('qt')) throw new Error('Qt attribute is missing');
      if (!this.isNumeric(article.qt)) throw new Error('Qt attribute have to be an integer');
      if (!Number.isInteger(article.qt)) throw new Error('Qt attribute have to be an integer, not a float');
    }

    /**
     * @description Hydrate from configuration
     * @returns {[string,string,string,string]}
     */

  }, {
    key: '_itemsToHydrate',
    value: function _itemsToHydrate() {
      return ['logo', 'order_template', 'invoice_template', 'date_format', 'order_reference_pattern', 'invoice_reference_pattern', 'order_note', 'invoice_note'];
    }

    /**
     * @description Hydrate recipient object
     * @param obj
     * @returns {*}
     */

  }, {
    key: 'recipient',
    value: function recipient(obj) {
      if (!obj) return this._recipient;
      return this._recipient.hydrate(obj, this._recipient._itemsToHydrate());
    }

    /**
     * @description Hydrate emitter object
     * @param obj
     * @returns {*}
     */

  }, {
    key: 'emitter',
    value: function emitter(obj) {
      if (!obj) return this._emitter;
      return this._emitter.hydrate(obj, this._emitter._itemsToHydrate());
    }

    /**
     * @description Precompile translation to merging glabal with custom translations
     * @returns {{logo: *, header_date: *, table_information, table_description, table_tax, table_quantity, table_price_without_taxes, table_price_without_taxes_unit, table_note, table_total_without_taxes, table_total_taxes, table_total_with_taxes, fromto_phone, fromto_mail, footer, moment: (*|moment.Moment)}}
     * @private
     */

  }, {
    key: '_preCompileCommonTranslations',
    value: function _preCompileCommonTranslations() {
      return {
        logo: this.logo,
        header_date: this.date,
        table_information: _i18n2.default.__({ phrase: 'table_information', locale: this.lang }),
        table_description: _i18n2.default.__({ phrase: 'table_description', locale: this.lang }),
        table_tax: _i18n2.default.__({ phrase: 'table_tax', locale: this.lang }),
        table_quantity: _i18n2.default.__({ phrase: 'table_quantity', locale: this.lang }),
        table_price_without_taxes: _i18n2.default.__({ phrase: 'table_price_without_taxes', locale: this.lang }),
        table_price_without_taxes_unit: _i18n2.default.__({ phrase: 'table_price_without_taxes_unit', locale: this.lang }),
        table_note: _i18n2.default.__({ phrase: 'table_note', locale: this.lang }),
        table_total_without_taxes: _i18n2.default.__({ phrase: 'table_total_without_taxes', locale: this.lang }),
        table_total_taxes: _i18n2.default.__({ phrase: 'table_total_taxes', locale: this.lang }),
        table_total_with_taxes: _i18n2.default.__({ phrase: 'table_total_with_taxes', locale: this.lang }),
        fromto_phone: _i18n2.default.__({ phrase: 'fromto_phone', locale: this.lang }),
        fromto_mail: _i18n2.default.__({ phrase: 'fromto_mail', locale: this.lang }),
        footer: _i18n2.default.__({ phrase: 'footer', locale: this.lang }),
        emitter_name: this.emitter().name,
        emitter_street_number: this.emitter().street_number,
        emitter_street_name: this.emitter().street_name,
        emitter_zip_code: this.emitter().zip_code,
        emitter_city: this.emitter().city,
        emitter_country: this.emitter().country,
        emitter_phone: this.emitter().phone,
        emitter_mail: this.emitter().mail,
        recipient_company: this.recipient().company_name,
        recipient_first_name: this.recipient().first_name,
        recipient_last_name: this.recipient().last_name,
        recipient_street_number: this.recipient().street_number,
        recipient_street_name: this.recipient().street_name,
        recipient_zip_code: this.recipient().zip_code,
        recipient_city: this.recipient().city,
        recipient_country: this.recipient().country,
        recipient_phone: this.recipient().phone,
        recipient_mail: this.recipient().mail,
        articles: this.article,
        table_total_without_taxes_value: this.formatOutputNumber(this.total_exc_taxes),
        table_total_taxes_value: this.formatOutputNumber(this.total_taxes),
        table_total_with_taxes_value: this.formatOutputNumber(this.total_inc_taxes),
        template_configuration: this._templateConfiguration(),
        moment: (0, _moment2.default)()
      };
    }

    /**
     * @description Compile pug template to HTML
     * @param keys
     * @returns {*}
     * @private
     */

  }, {
    key: '_compile',
    value: function _compile(keys) {
      var template = keys.filename === 'order' ? this.order_template : this.invoice_template;
      var compiled = _pug2.default.compileFile(_path2.default.resolve(template));
      return compiled(keys);
    }

    /**
     * @description Return invoice translation keys object
     * @returns {*}
     */

  }, {
    key: 'getInvoice',
    value: function getInvoice() {
      var _this2 = this;

      var keys = {
        invoice_header_title: _i18n2.default.__({ phrase: 'invoice_header_title', locale: this.lang }),
        invoice_header_subject: _i18n2.default.__({ phrase: 'invoice_header_subject', locale: this.lang }),
        invoice_header_reference: _i18n2.default.__({ phrase: 'invoice_header_reference', locale: this.lang }),
        invoice_header_reference_value: this.reference ? this.reference : this._getReferenceFromPattern(this.invoice_reference_pattern),
        invoice_header_date: _i18n2.default.__({ phrase: 'invoice_header_date', locale: this.lang }),
        table_note_content: this.invoice_note,
        note: function note(_note) {
          return _note ? _this2.invoice_note = _note : _this2.invoice_note;
        },
        filename: 'invoice'
      };
      return Object.assign(keys, {
        toHTML: function toHTML() {
          return _this2._toHTML(keys);
        },
        toPDF: function toPDF() {
          return _this2._toPDF(keys);
        }
      }, this._preCompileCommonTranslations());
    }

    /**
     * @description Return order translation keys object
     * @returns {*}
     */

  }, {
    key: 'getOrder',
    value: function getOrder() {
      var _this3 = this;

      var keys = {
        order_header_title: _i18n2.default.__({ phrase: 'order_header_title', locale: this.lang }),
        order_header_subject: _i18n2.default.__({ phrase: 'order_header_subject', locale: this.lang }),
        order_header_reference: _i18n2.default.__({ phrase: 'order_header_reference', locale: this.lang }),
        order_header_reference_value: this.reference ? this.reference : this._getReferenceFromPattern(this.order_reference_pattern),
        order_header_date: _i18n2.default.__({ phrase: 'order_header_date', locale: this.lang }),
        table_note_content: this.order_note,
        note: function note(_note2) {
          return _note2 ? _this3.order_note = _note2 : _this3.order_note;
        },
        filename: 'order'
      };
      return Object.assign(keys, {
        toHTML: function toHTML() {
          return _this3._toHTML(keys);
        },
        toPDF: function toPDF() {
          return _this3._toPDF(keys);
        }
      }, this._preCompileCommonTranslations());
    }

    /**
     * @description Export object with html content and exportation functions
     * @returns {{html: *, toFile: (function(*): *)}}
     * @private
     */

  }, {
    key: '_toHTML',
    value: function _toHTML(keys) {
      var _this4 = this;

      var html = this._compile(keys.filename === 'order' ? this.getOrder() : this.getInvoice());
      return {
        html: html,
        toFile: function toFile(filepath) {
          return _this4._toFileFromHTML(html, filepath ? filepath : keys.filename + '.html');
        }
      };
    }

    /**
     * @description Save content to pdf file
     * @param filepath
     * @returns {*}
     * @private
     */

  }, {
    key: '_toPDF',
    value: function _toPDF(keys) {
      var _this5 = this;

      var pdf = _htmlPdf2.default.create(this._toHTML(keys).html);
      return {
        pdf: pdf,
        toFile: function toFile(filepath) {
          return _this5._toFileFromPDF(pdf, filepath ? filepath : keys.filename + '.pdf');
        },
        toBuffer: function toBuffer(filepath) {
          return _this5._toBufferFromPDF(pdf);
        },
        toStream: function toStream(filepath) {
          return _this5._toStreamFromPDF(pdf, filepath ? filepath : keys.filename + '.pdf');
        }
      };
    }

    /**
     * @description Save content into file from toHTML() method
     * @param content
     * @param filepath
     * @returns {Promise}
     * @private
     */

  }, {
    key: '_toFileFromHTML',
    value: function _toFileFromHTML(content, filepath) {
      return new Promise(function (resolve, reject) {
        return _fs2.default.writeFile(filepath, content, function (err) {
          if (err) reject(err);
          return resolve();
        });
      });
    }

    /**
     * @description Save content into file from toPDF() method
     * @param content
     * @param filepath
     * @returns {Promise}
     * @private
     */

  }, {
    key: '_toFileFromPDF',
    value: function _toFileFromPDF(content, filepath) {
      return new Promise(function (resolve, reject) {
        return content.toFile(filepath, function (err, res) {
          if (err) return reject(err);
          return resolve(res);
        });
      });
    }

    /**
     * @description Export PDF to buffer
     * @param content
     * @returns {*}
     * @private
     */

  }, {
    key: '_toBufferFromPDF',
    value: function _toBufferFromPDF(content) {
      return content.toBuffer(function (err, buffer) {
        if (err) return console.error(err);
        return buffer;
      });
    }

    /**
     * @description Export PDF to file using stream
     * @param content
     * @param filepath
     * @returns {*}
     * @private
     */

  }, {
    key: '_toStreamFromPDF',
    value: function _toStreamFromPDF(content, filepath) {
      return content.toStream(function (err, stream) {
        return stream.pipe(_fs2.default.createWriteStream(filepath));
      });
    }

    /**
     * @description Return reference
     * @param item
     * @return {*}
     * @private
     */

  }, {
    key: '_getReferenceFromPattern',
    value: function _getReferenceFromPattern(pattern) {
      var tmp = pattern.split('$').slice(1);
      var output = '';
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = tmp[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (!item.endsWith('}')) throw new Error('Wrong pattern type');
          if (item.startsWith('prefix{')) output += item.replace('prefix{', '').slice(0, -1);else if (item.startsWith('separator{')) output += item.replace('separator{', '').slice(0, -1);else if (item.startsWith('date{')) output += (0, _moment2.default)().format(item.replace('date{', '').slice(0, -1));else if (item.startsWith('id{')) {
            var id = item.replace('id{', '').slice(0, -1);
            if (!/^\d+$/.test(id)) throw new Error('Id must be an integer (' + id + ')');
            output += this._id ? this.pad(this._id, id.length) : this.pad(0, id.length);
          } else throw new Error(item + ' pattern reference unknown');
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return output;
    }

    /**
     * @description Calculates number of pages and items per page
     * @return {{rows_in_first_page: number, rows_in_others_pages: number, loop_table: number}}
     * @private
     */

  }, {
    key: '_templateConfiguration',
    value: function _templateConfiguration() {
      var template_rows_per_page = 29;
      var templateConfig = {
        rows_in_first_page: this.article.length > 19 ? template_rows_per_page : 19,
        rows_per_pages: 43,
        rows_in_last_page: 33
      };

      var nbArticles = this.article.length;
      var loop = 1;
      while (true) {

        if (loop === 1) {
          nbArticles -= templateConfig.rows_in_first_page;
          if (nbArticles <= 0) {
            templateConfig.loop_table = templateConfig.rows_in_first_page !== template_rows_per_page ? 1 : 2;
            return templateConfig;
          }
        }

        if (loop >= 2) {
          if (nbArticles <= templateConfig.rows_in_last_page) {
            templateConfig.loop_table = loop;
            return templateConfig;
          } else {
            nbArticles -= templateConfig.rows_per_pages;
            if (nbArticles <= 0) {
              templateConfig.loop_table = loop;
              return templateConfig;
            }
          }
        }
        loop++;
      }
    }
  }, {
    key: 'template',
    get: function get() {
      return this._template;
    },
    set: function set(value) {
      this._template = value;
    }
  }, {
    key: 'lang',
    get: function get() {
      return !this._lang ? 'en' : this._lang;
    },
    set: function set(value) {
      value = value.toLowerCase();
      if (!['en', 'fr'].includes(value)) throw new Error('Wrong lang, please set \'en\' or \'fr\'');
      this._lang = value;
    }
  }, {
    key: 'id',
    get: function get() {
      return this._id;
    },
    set: function set(value) {
      this._id = value;
    }
  }, {
    key: 'order_reference_pattern',
    get: function get() {
      return !this._order_reference_pattern ? '$prefix{OR}$date{YYMM}$separator{-}$id{00000}' : this._order_reference_pattern;
    },
    set: function set(value) {
      this._order_reference_pattern = value;
    }
  }, {
    key: 'invoice_reference_pattern',
    get: function get() {
      return !this._invoice_reference_pattern ? '$prefix{IN}$date{YYMM}$separator{-}$id{00000}' : this._invoice_reference_pattern;
    },
    set: function set(value) {
      this._invoice_reference_pattern = value;
    }
  }, {
    key: 'reference',
    get: function get() {
      return this._reference;
    },
    set: function set(value) {
      this._reference = value;
    }
  }, {
    key: 'logo',
    get: function get() {
      return this._logo;
    },
    set: function set(value) {
      this._logo = value;
    }
  }, {
    key: 'order_template',
    get: function get() {
      return this._order_template;
    },
    set: function set(value) {
      this._order_template = value;
    }
  }, {
    key: 'invoice_template',
    get: function get() {
      return this._invoice_template;
    },
    set: function set(value) {
      this._invoice_template = value;
    }
  }, {
    key: 'order_note',
    get: function get() {
      return this._order_note;
    },
    set: function set(value) {
      this._order_note = value;
    }
  }, {
    key: 'invoice_note',
    get: function get() {
      return this._invoice_note;
    },
    set: function set(value) {
      this._invoice_note = value;
    }
  }, {
    key: 'date_format',
    get: function get() {
      return !this._date_format ? 'YYYY/MM/DD' : this._date_format;
    },
    set: function set(value) {
      this._date_format = value;
    }
  }, {
    key: 'date',
    get: function get() {
      return !this._date ? (0, _moment2.default)().format(this.date_format) : this._date;
    },
    set: function set(value) {
      if (!(0, _moment2.default)(value).isValid()) throw new Error('Date not valid');
      this._date = (0, _moment2.default)(value).format(this.date_format);
    }
  }, {
    key: 'total_exc_taxes',
    get: function get() {
      return this._total_exc_taxes;
    },
    set: function set(value) {
      this._total_exc_taxes = value;
    }
  }, {
    key: 'total_taxes',
    get: function get() {
      return this._total_taxes;
    },
    set: function set(value) {
      this._total_taxes = value;
    }
  }, {
    key: 'total_inc_taxes',
    get: function get() {
      return this._total_inc_taxes;
    },
    set: function set(value) {
      this._total_inc_taxes = value;
    }
  }, {
    key: 'article',
    get: function get() {
      return this._article;
    }

    /**
     * @description Set
     * @param array || object
     * @example article({description: 'Licence', tax: 20, price: 100, qt: 1})
     * @example article([{description: 'Licence', tax: 20, price: 100, qt: 1}, {description: 'Licence', tax: 20, price: 100, qt: 1}])
     */
    ,
    set: function set(value) {
      if (Array.isArray(value)) {
        for (var i = 0; i < value.length; i++) {
          this._checkArticle(value[i]);
          value[i].total_product_without_taxes = this.formatOutputNumber(value[i].price * value[i].qt);
          value[i].total_product_taxes = this.formatOutputNumber(this.round(value[i].total_product_without_taxes * (value[i].tax / 100)));
          value[i].total_product_with_taxes = this.formatOutputNumber(this.round(Number(value[i].total_product_without_taxes) + Number(value[i].total_product_taxes)));
          value[i].price = this.formatOutputNumber(value[i].price);
          value[i].tax = this.formatOutputNumber(value[i].tax);
          this.total_exc_taxes += Number(value[i].total_product_without_taxes);
          this.total_inc_taxes += Number(value[i].total_product_with_taxes);
          this.total_taxes += Number(value[i].total_product_taxes);
        }
      } else {
        this._checkArticle(value);
        value.total_product_without_taxes = this.formatOutputNumber(value.price * value.qt);
        value.total_product_taxes = this.formatOutputNumber(this.round(value.total_product_without_taxes * (value.tax / 100)));
        value.total_product_with_taxes = this.formatOutputNumber(this.round(Number(value.total_product_without_taxes) + Number(value.total_product_taxes)));
        value.price = this.formatOutputNumber(value.price);
        value.tax = this.formatOutputNumber(value.tax);
        this.total_exc_taxes += Number(value.total_product_without_taxes);
        this.total_inc_taxes += Number(value.total_product_with_taxes);
        this.total_taxes += Number(value.total_product_taxes);
      }
      this._article = this._article ? this._article.concat(value) : [].concat(value);
    }
  }]);

  return Generator;
}(_common2.default);

exports.default = Generator;
//# sourceMappingURL=generator.js.map
