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

  get lang() {
    return this._lang
  }

  set lang(value) {
    this._lang = value
  }

  _preCompileCommonTranslations() {
    return {
      table_information: i18n.__({phrase: 'table_information', locale: this.lang}),
      table_description: i18n.__({phrase: 'table_description', locale: this.lang}),
      table_tax: i18n.__({phrase: 'table_tax', locale: this.lang}),
      table_quantity: i18n.__({phrase: 'table_quantity', locale: this.lang}),
      table_price_without_taxes: i18n.__({phrase: 'table_price_without_taxes', locale: this.lang}),
      table_price_without_taxes_unit: i18n.__({phrase: 'table_price_without_taxes_unit', locale: this.lang}),
      table_note: i18n.__({phrase: 'table_note', locale: this.lang}),
      table_total_without_taxes: i18n.__({phrase: 'table_total_without_taxes', locale: this.lang}),
      table_total_taxes: i18n.__({phrase: 'table_total_taxes', locale: this.lang}),
      table_total_with_taxes: i18n.__({phrase: 'table_total_with_taxes', locale: this.lang}),
      footer: i18n.__({phrase: 'footer', locale: this.lang})
    }
  }

  _compile(translations) {
    let html = jade.compileFile(path.resolve(this.template))
    return html(Object.assign(this._preCompileCommonTranslations(), translations))
  }

  getInvoice() {
    return this._compile({
      invoice_header_title: i18n.__({phrase: 'invoice_header_title', locale: this.lang}),
      invoice_header_subject: i18n.__({phrase: 'invoice_header_subject', locale: this.lang}),
      invoice_header_reference: i18n.__({phrase: 'invoice_header_reference', locale: this.lang}),
      invoice_header_date: i18n.__({phrase: 'invoice_header_date', locale: this.lang})
    })
  }

  getOrder() {
    return this._compile({
      order_header_title: i18n.__({phrase: 'order_header_title', locale: this.lang}),
      order_header_subject: i18n.__({phrase: 'order_header_subject', locale: this.lang}),
      order_header_reference: i18n.__({phrase: 'order_header_reference', locale: this.lang}),
      order_header_date: i18n.__({phrase: 'order_header_date', locale: this.lang})
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
