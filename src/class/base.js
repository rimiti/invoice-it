import jade from 'jade'
import path from 'path'
import i18n from '../lib/i18n'

export default class Base {

  get template() {
    return this._template
  }

  set template(value) {
    this._template = value
  }

  _compile() {
    return jade.compileFile(path.resolve(this.template))
  }

  getOrder() {
    let html = this._compile()
    html({
      ORDER_TITLE: i18n.__({phrase: order.header.title, locale: params.user.lang})
    })
  }

  /**
   * @description Hydrate current instance with obj attributes
   * @param obj
   * @param attributes
   */
  hydrate(obj, attributes) {
    if (!obj) return
    for (let item of attributes) {
      this[item] = obj[item]
    }
  }
}
