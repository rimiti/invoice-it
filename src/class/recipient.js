import Common from './common'

export default class Recipient extends Common {

  constructor(recipient) {
    super()
    this.hydrate(recipient, this.itemsToHydrate())
  }

  get company_name() {
    return this._company_name
  }

  set company_name(value) {
    this._company_name = value
  }

  get first_name() {
    return this._first_name
  }

  set first_name(value) {
    this._first_name = value
  }

  get last_name() {
    return this._last_name
  }

  set last_name(value) {
    this._last_name = value
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

  itemsToHydrate() {
    return ['company_name', 'first_name', 'last_name', 'street_number', 'street_name', 'zip_code', 'city', 'phone', 'mail']
  }
}
