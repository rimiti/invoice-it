import Common from './common'
import Recipient from './recipient'
import Emitter from './emitter'
import jade from 'jade'
import path from 'path'
import i18n from '../lib/i18n'
import fs from 'fs'
import moment from 'moment'
import htmlToPdf from 'html-pdf'

export default class Generator extends Common {

  constructor(config) {
    super()
    this._recipient = (config.recipient) ? new Recipient(config.recipient) : new Recipient()
    this._emitter = (config.emitter) ? new Emitter(config.emitter) : new Emitter()
    this.hydrate(config.global, this.itemsToHydrate())
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

  get order_reference_pattern() {
    return this._order_reference_pattern
  }

  set order_reference_pattern(value) {
    this._order_reference_pattern = value
  }

  get invoice_reference_pattern() {
    return this._invoice_reference_pattern
  }

  set invoice_reference_pattern(value) {
    this._invoice_reference_pattern = value
  }

  get logo() {
    return this._logo
  }

  set logo(value) {
    this._logo = value
  }

  get order_template() {
    return this._order_template
  }

  set order_template(value) {
    this._order_template = value
  }

  get invoice_template() {
    return this._invoice_template
  }

  set invoice_template(value) {
    this._invoice_template = value
  }

  get date_format() {
    return (!this._date_format) ? 'YYYY/MM/DD' : this._date_format
  }

  set date_format(value) {
    this._date_format = value
  }

  get date() {
    return (!this._date) ? moment().format(this.date_format) : this._date
  }

  set date(value) {
    if (!moment(value).isValid()) throw new Error(`Date not valid`)
    this._date = moment(value).format(this.date_format)
  }

  /**
   * @description Hydrate from configuration
   * @returns {[string,string,string,string]}
   */
  itemsToHydrate() {
    return ['logo', 'order_template', 'invoice_template', 'date_format', 'order_reference_pattern', 'invoice_reference_pattern']
  }

  /**
   * @description Hydrate recipient object
   * @param obj
   * @returns {*}
   */
  recipient(obj) {
    if (!obj) return this._recipient
    return this._recipient.hydrate(obj, this._recipient.itemsToHydrate())
  }

  /**
   * @description Hydrate emitter object
   * @param obj
   * @returns {*}
   */
  emitter(obj) {
    if (!obj) return this._emitter
    return this._emitter.hydrate(obj, this._emitter.itemsToHydrate())
  }

  /**
   * @description Precompile translation to merging glabal with custom translations
   * @returns {{logo: *, header_date: *, table_information, table_description, table_tax, table_quantity, table_price_without_taxes, table_price_without_taxes_unit, table_note, table_total_without_taxes, table_total_taxes, table_total_with_taxes, fromto_phone, fromto_mail, footer, moment: (*|moment.Moment)}}
   * @private
   */
  _preCompileCommonTranslations() {
    return {
      logo: this.logo,
      header_date: this.date,
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
      fromto_phone: i18n.__({phrase: 'fromto_phone', locale: this.lang}),
      fromto_mail: i18n.__({phrase: 'fromto_mail', locale: this.lang}),
      footer: i18n.__({phrase: 'footer', locale: this.lang}),
      moment: moment()
    }
  }

  /**
   * @description Compile jade template to HTML
   * @param keys
   * @returns {*}
   * @private
   */
  _compile(keys) {
    let template = keys.filename === 'order' ? this.order_template : this.invoice_template
    let compiled = jade.compileFile(path.resolve(template))
    return compiled(keys)
  }

  /**
   * @description Return invoice translation keys object
   * @returns {*}
   */
  getInvoice() {
    let keys = {
      invoice_header_title: i18n.__({phrase: 'invoice_header_title', locale: this.lang}),
      invoice_header_subject: i18n.__({phrase: 'invoice_header_subject', locale: this.lang}),
      invoice_header_reference: i18n.__({phrase: 'invoice_header_reference', locale: this.lang}),
      invoice_header_date: i18n.__({phrase: 'invoice_header_date', locale: this.lang}),
      filename: 'invoice'
    }
    return Object.assign(keys, {
      toHTML: () => this._toHTML(keys),
      toPDF: () => this._toPDF(keys)
    }, this._preCompileCommonTranslations())
  }

  /**
   * @description Return order translation keys object
   * @returns {*}
   */
  getOrder() {
    let keys = {
      order_header_title: i18n.__({phrase: 'order_header_title', locale: this.lang}),
      order_header_subject: i18n.__({phrase: 'order_header_subject', locale: this.lang}),
      order_header_reference: i18n.__({phrase: 'order_header_reference', locale: this.lang}),
      // order_header_reference_value: ,
      order_header_date: i18n.__({phrase: 'order_header_date', locale: this.lang}),
      emitter_name: this.emitter().name,
      emitter_street_number: this.emitter().street_number,
      emitter_street_name: this.emitter().street_name,
      emitter_zip_code: this.emitter().zip_code,
      emitter_city: this.emitter().city,
      emitter_country: this.emitter().country,
      emitter_phone: this.emitter().phone,
      emitter_mail: this.emitter().mail,
      recipient_company: this.recipient().company_name,
      recipient_first_name: this.recipient().first_name,
      recipient_last_name: this.recipient().last_name,
      recipient_street_number: this.recipient().street_number,
      recipient_street_name: this.recipient().street_name,
      recipient_zip_code: this.recipient().zip_code,
      recipient_city: this.recipient().city,
      recipient_country: this.recipient().country,
      recipient_phone: this.recipient().phone,
      recipient_mail: this.recipient().mail,
      table_note_content: '',
      table_total_without_taxes_value: '3,99',
      table_total_taxes_value: '0,08',
      table_total_with_taxes_value: '4,79',
      filename: 'order'
    }
    return Object.assign(keys, {
      toHTML: () => this._toHTML(keys),
      toPDF: () => this._toPDF(keys)
    }, this._preCompileCommonTranslations())
  }

  /**
   * @description Export object with html content and exportation functions
   * @returns {{html: *, toFile: (function(*): *)}}
   * @private
   */
  _toHTML(keys) {
    const html = this._compile(keys.filename === 'order' ? this.getOrder() : this.getInvoice())
    return {
      html: html,
      toFile: (filepath) => this._toFileFromHTML(html, (filepath) ? filepath : `${keys.filename}.html`)
    }
  }

  /**
   * @description Save content to pdf file
   * @param filepath
   * @returns {*}
   * @private
   */
  _toPDF(keys) {
    const pdf = htmlToPdf.create(this._toHTML(keys).html)
    return {
      pdf: pdf,
      toFile: (filepath) => this._toFileFromPDF(pdf, (filepath) ? filepath : `${keys.filename}.pdf`),
      toBuffer: (filepath) => this._toBufferFromPDF(pdf),
      toStream: (filepath) => this._toStreamFromPDF(pdf, (filepath) ? filepath : `${keys.filename}.pdf`)
    }
  }

  /**
   * @description Save content into file from toHTML() method
   * @param content
   * @param filepath
   * @returns {*}
   * @private
   */
  _toFileFromHTML(content, filepath) {
    return fs.writeFile(filepath, content)
  }

  /**
   * @description Save content into file from toPDF() method
   * @param content
   * @param filepath
   * @returns {*}
   * @private
   */
  _toFileFromPDF(content, filepath) {
    return content.toFile(filepath, (err, res) => {
      if (err) return console.error(err)
      return res
    })
  }

  /**
   * @description Export PDF to buffer
   * @param content
   * @returns {*}
   * @private
   */
  _toBufferFromPDF(content) {
    return content.toBuffer((err, buffer) => {
      if (err) return console.error(err)
      return buffer
    })
  }

  /**
   * @description Export PDF to file using stream
   * @param content
   * @param filepath
   * @returns {*}
   * @private
   */
  _toStreamFromPDF(content, filepath) {
    return content.toStream((err, stream) => {
      return stream.pipe(fs.createWriteStream(filepath))
    })
  }
}
