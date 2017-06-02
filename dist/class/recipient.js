'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _common = require('./common');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Recipient = function (_Common) {
  _inherits(Recipient, _Common);

  function Recipient(recipient) {
    _classCallCheck(this, Recipient);

    var _this = _possibleConstructorReturn(this, (Recipient.__proto__ || Object.getPrototypeOf(Recipient)).call(this));

    _this.hydrate(recipient, _this._itemsToHydrate());
    return _this;
  }

  _createClass(Recipient, [{
    key: '_itemsToHydrate',
    value: function _itemsToHydrate() {
      return ['company_name', 'first_name', 'last_name', 'street_number', 'street_name', 'zip_code', 'city', 'country', 'phone', 'mail'];
    }
  }, {
    key: 'company_name',
    get: function get() {
      return this._company_name;
    },
    set: function set(value) {
      this._company_name = value;
    }
  }, {
    key: 'first_name',
    get: function get() {
      return this._first_name;
    },
    set: function set(value) {
      this._first_name = value;
    }
  }, {
    key: 'last_name',
    get: function get() {
      return this._last_name;
    },
    set: function set(value) {
      this._last_name = value;
    }
  }, {
    key: 'street_number',
    get: function get() {
      return this._street_number;
    },
    set: function set(value) {
      this._street_number = value;
    }
  }, {
    key: 'street_name',
    get: function get() {
      return this._street_name;
    },
    set: function set(value) {
      this._street_name = value;
    }
  }, {
    key: 'zip_code',
    get: function get() {
      return this._zip_code;
    },
    set: function set(value) {
      this._zip_code = value;
    }
  }, {
    key: 'city',
    get: function get() {
      return this._city;
    },
    set: function set(value) {
      this._city = value;
    }
  }, {
    key: 'country',
    get: function get() {
      return this._country;
    },
    set: function set(value) {
      this._country = value;
    }
  }, {
    key: 'phone',
    get: function get() {
      return this._phone;
    },
    set: function set(value) {
      this._phone = value;
    }
  }, {
    key: 'mail',
    get: function get() {
      return this._mail;
    },
    set: function set(value) {
      this._mail = value;
    }
  }]);

  return Recipient;
}(_common2.default);

exports.default = Recipient;
//# sourceMappingURL=recipient.js.map
