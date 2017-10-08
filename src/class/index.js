import Generator from './generator'
import jsonOverride from 'json-override'

let configuration

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
    let generator = new Generator(configuration)
    generator.recipient(recipient)
    generator.emitter(emitter)
    return generator
  }

}
