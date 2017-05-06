import Generator from './generator'

let configuration

export default {

  /**
   * @description Configure the generator with object config
   * @param config
   */
  configure: (config) => {
    configuration = config
  },

  /**
   * @description Generate generator with configuration
   * @param emitter
   * @param recipient
   * @returns {Generator}
   */
  create: (recipient, emitter) => {
    let generator = new Generator(configuration)
    generator.emitter(emitter)
    generator.recipient(recipient)
    return generator
  }

}
