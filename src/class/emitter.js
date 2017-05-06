import Common from './common'

export default class Emitter extends Common {

  constructor(emitter) {
    super()
    this.name = (emitter) ? emitter.name : ''
    this.street_number = (emitter) ? emitter.street_number : ''
    this.street_name = (emitter) ? emitter.street_name : ''
    this.zip_code = (emitter) ? emitter.zip_code : ''
    this.city = (emitter) ? emitter.city : ''
    this.hydrate(emitter, this.itemsToHydrate())
  }

  get name() {
    return this._company_name
  }

  set name(value) {
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

  itemsToHydrate() {
    return ['name', 'street_number', 'street_name', 'zip_code', 'city', 'phone', 'mail', 'website']
  }
}
