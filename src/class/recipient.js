import Base from './base'

export default class Recipient extends Base {

  constructor(recipient) {
    super()
    this.hydrate(recipient, this._itemsToHydrate())
  }

  get company_name() {
    return this._company_name
  }

  set company_name(value) {
    this._company_name = value
  }

  get street_number() {
    return this._street_number
  }

  set street_number(value) {
    this._street_number = value
  }

  get street_name() {
    return this._street_name
  }

  set street_name(value) {
    this._street_name = value
  }

  get zip_code() {
    return this._zip_code
  }

  set zip_code(value) {
    this._zip_code = value
  }

  get city() {
    return this._city
  }

  set city(value) {
    this._city = value
  }

  get recipient() {
    return this._recipient
  }

  set recipient(value) {
    this._recipient = value
  }

  get phone() {
    return this._phone
  }

  set phone(value) {
    this._phone = value
  }

  get mail() {
    return this._mail
  }

  set mail(value) {
    this._mail = value
  }

  get website() {
    return this._website
  }

  set website(value) {
    this._website = value
  }

  _itemsToHydrate() {
    return ['company_name', 'street_number', 'street_name', 'zip_code', 'city', 'recipient', 'phone', 'mail', 'website']
  }
}
