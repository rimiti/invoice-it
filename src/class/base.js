import jade from 'jade'
import path from 'path'

export default class Base {

  constructor() {
    this._template = null
  }

  get template() {
    return this._template
  }

  set template(value) {
    this._template = value
  }

  _compile() {
    let emailFn = jade.compileFile(path.resolve(this.template))
  }

  /**
   * @description Hydrate current instance with obj attributes
   * @param obj
   * @return {Fiche}
   */
  hydrate(obj, attributes) {
    for (let item of attributes) {
      this[item] = obj[item]
    }
  }
}
