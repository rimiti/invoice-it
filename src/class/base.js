import jade from 'jade'
import path from 'path'

export default class Base {

    constructor() {
        this._template = null
    }

    _compile() {
        let emailFn = jade.compileFile(path.resolve(this.template))
    }

    get template() {
        return this._template;
    }

    set template(value) {
        this._template = value;
    }
}