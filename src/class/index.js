import jsonOverride from 'json-override';
import Generator from './generator';

let configuration;

export default {

  /**
   * @description Configure invoiceIt with object config
   * @param config
   */
  configure: (config) => configuration = jsonOverride(configuration, config),

  /**
   * @description Generate invoiceIt with configuration
   * @param emitter
   * @param recipient
   * @returns {Generator}
   */
  create: (recipient, emitter) => {
    const generator = new Generator(configuration);
    generator.recipient(recipient);
    generator.emitter(emitter);
    return generator;
  },

};
