import Base from 'base'

export default class Customer extends Base {

    constructor() {
        this._company_name = ''
        this._first_name = ''
        this._last_name = ''
        this._street_number = ''
        this._street_name = ''
        this._zip_code = ''
        this._city = ''
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
}