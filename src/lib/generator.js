import generator from '../class'

generator.configure({
    "header": {
      "logo": "https://placeholdit.imgix.net/~text?txtsize=38&txt=logo&w=200&h=100"
    },
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
    "templates": {
      "order": {
        "path": "./static/order.jade",
        "reference_pattern": "{prefix}{date-YY}{date-MM}-{id-6}"
      },
      "invoice": {
        "path": "./static/invoice.jade",
        "reference_pattern": "{prefix}{date-YY}{date-MM}-{id-6}"
      }
    }
  }
)

export default generator
