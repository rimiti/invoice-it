import Generator from './generator'

export default (() => {

  const document = {}
  let configuration

  /**
   * @description Configure the generator with object config
   * @param config
   */
  document.configure = (config) => configuration = config

  /**
   * @description Generate document with configuration
   * @param emitter
   * @param recipient
   * @returns {Generator}
   */
  document.create = (emitter, recipient) => {
    let generator = new Generator(configuration)
    generator.emitter(emitter)
    generator.recipient(recipient)
    return generator
  }

  return document
})
