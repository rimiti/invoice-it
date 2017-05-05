import Base from './base'
import config from '../config'

export default class Emitter extends Base {

  constructor(emitter) {
    super()
    this.company_name = config.from.company.name
    this.street_number = config.from.company.street_number
    this.street_name = config.from.company.street_name
    this.zip_code = config.from.company.zip_code
    this.city = config.from.company.city
    this.hydrate(emitter, this._itemsToHydrate())
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

  _itemsToHydrate() {
    return ['company_name', 'street_number', 'street_name', 'zip_code', 'city', 'recipient', 'phone', 'mail', 'website']
  }
}
