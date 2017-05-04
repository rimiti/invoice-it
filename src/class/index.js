import Recipient from './recipient'
import Emitter from './emitter'

export default class Document {

  constructor(emitter, recipient) {
    this.emitter =  new Emitter(emitter)
    this.recipient = new Recipient(recipient)
  }
}
