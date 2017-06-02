'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _generator = require('./generator');

var _generator2 = _interopRequireDefault(_generator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configuration = void 0;

exports.default = {

  /**
   * @description Configure the generator with object config
   * @param config
   */
  configure: function configure(config) {
    return configuration = config;
  },

  /**
   * @description Generate generator with configuration
   * @param emitter
   * @param recipient
   * @returns {Generator}
   */
  create: function create(recipient, emitter) {
    var generator = new _generator2.default(configuration);
    generator.recipient(recipient);
    generator.emitter(emitter);
    return generator;
  }

};
//# sourceMappingURL=index.js.map
