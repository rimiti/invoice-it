import Recipient from './recipient'
import Emitter from './emitter'
import jade from 'jade'
import path from 'path'
import i18n from '../lib/i18n'
import fs from 'fs'
import moment from 'moment'

export default class Document {

  constructor(recipient, emitter) {
    this.recipient = new Recipient(recipient)
    this.emitter = new Emitter(emitter)
  }

  get template() {
    return this._template
  }

  set template(value) {
    this._template = value
  }

  get lang() {
    return (!this._lang) ? 'en' : this._lang
  }

  set lang(value) {
    this._lang = value
  }

  get id() {
    return this._id
  }

  set id(value) {
    this._id = value
  }

  get reference() {
    return this._reference
  }

  set reference(value) {
    this._reference = value
  }

  configure(value) {
    this._config = value
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
      footer: i18n.__({phrase: 'footer', locale: this.lang}),
      moment: moment()
    }
  }

  _compile(translations) {
    let html = jade.compileFile(path.resolve('./static/order.jade'))

    fs.writeFile('test.html', html(Object.assign(this._preCompileCommonTranslations(), translations)), function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    });

    return
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
    console.log(`dans le getOrder()`)
    return this._compile({
      order_header_title: i18n.__({phrase: 'order_header_title', locale: this.lang}),
      order_header_subject: i18n.__({phrase: 'order_header_subject', locale: this.lang}),
      order_header_reference: i18n.__({phrase: 'order_header_reference', locale: this.lang}),
      order_header_date: i18n.__({phrase: 'order_header_date', locale: this.lang})
    })
  }
}
