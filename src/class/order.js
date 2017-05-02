import Customer from 'customer'
import config from '../config'

class Order extends Customer {

    constructor() {
        super()
        this.template = config.templates.order.path
    }


}