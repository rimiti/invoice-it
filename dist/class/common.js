"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Common = function () {
  function Common() {
    _classCallCheck(this, Common);
  }

  _createClass(Common, [{
    key: "hydrate",


    /**
     * @description Hydrate current instance with obj attributes
     * @param obj
     * @param attributes
     */
    value: function hydrate(obj, attributes) {
      if (!obj) return;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = attributes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          this[item] = obj[item] ? obj[item] : '';
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
    }

    /**
     * @description Return number with padding
     * @example if id = 10, return 0010
     * @param num
     * @param size
     * @return {string}
     * @private
     */

  }, {
    key: "pad",
    value: function pad(num) {
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

      var output = num.toString();
      while (output.length < size) {
        output = "0" + output;
      }return output;
    }

    /**
     * @description Check if is a number
     * @param n
     * @returns {boolean}
     * @private
     */

  }, {
    key: "isNumeric",
    value: function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    /**
     * @description Round float with x decimals
     * @param num
     * @param decimals, default 2 decimals
     * @returns {number}
     */

  }, {
    key: "round",
    value: function round(num) {
      var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

      if (!("" + num).includes("e")) {
        return +(Math.round(num + 'e+' + decimals) + 'e-' + decimals);
      } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + decimals > 0) sig = '+';
        return +(Math.round(+arr[0] + 'e' + sig + (+arr[1] + decimals)) + 'e-' + decimals);
      }
    }

    /**
     * @description Format number to return number with two decimals
     * @param num
     * @return {string}
     */

  }, {
    key: "formatOutputNumber",
    value: function formatOutputNumber(num) {
      var number = num.toString();
      if (number.includes('.')) {
        var split = number.split('.');
        if (split[1].length === 1) return split[0] + "." + split[1] + "0";else if (split[1].length === 2) return number;else return split[0] + "." + split[1][0] + split[1][1];
      }
      return number + ".00";
    }
  }]);

  return Common;
}();

exports.default = Common;
//# sourceMappingURL=common.js.map
