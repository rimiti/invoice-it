import generator from '../class'

generator.configure({
    "emitter": {
      "name": "Your company",
      "street_number": "10",
      "street_name": "wall street",
      "zip_code": "77340",
      "city": "New York",
      "phone": "01 00 00 00 00",
      "mail": "contact@website.com",
      "website": "www.website.com"
    },
    "global": {
      "logo": "http://placehold.it/230x70&text=logo",
      "order_template": "./static/order.jade",
      "invoice_template": "./static/invoice.jade",
    }
  }
)

export default generator
