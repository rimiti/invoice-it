# invoice-generator

Generate your orders and you invoices and export them easily.
If you want some examples, check tests.

## Usage

### Order

To generate an order:

```js
import ig from 'invoice-generator'

  let recipient = {
    company_name: 'Receiver company',
    first_name: 'Will',
    last_name: 'Jameson',
    street_number: '20',
    street_name: 'Rue Victor Hugo',
    zip_code: '77340',
    city: 'Pontault-Combault',
    country: 'France',
    phone: '06 00 00 00 00',
    mail: 'will.jameson@test.com'
  }

  let emitter = {
    name: 'Dim Solution',
    street_number: '15',
    street_name: 'Rue Jean Jaures',
    zip_code: '75012',
    city: 'Paris',
    country: 'France',
    phone: '01 00 00 00 00',
    mail: 'contact@dimsolution.com',
    website: 'www.dimsolution.com'
  }

  let order = generator.create(recipient, emitter)
```

You can also use getter / setters like that

```js
let order = generator.create()

order.recipient.company_name = 'Receiver company'
order.recipient.first_name = 'Will'
order.recipient.last_name = 'Jameson'
order.recipient.street_number = '20'
order.recipient.street_name = 'Rue Victor Hugo'
order.recipient.zip_code = '77340'
order.recipient.city = 'Pontault-Combault'
order.recipient.country = 'France'
order.recipient.phone = '06 00 00 00 00'
order.recipient.mail = 'will.jameson@test.com'

order.emitter.name = 'Dim Solution'
order.emitter.street_number = '15'
order.emitter.street_name = 'Rue Jean Jaures'
order.emitter.zip_code = '75012'
order.emitter.city = 'Paris'
order.emitter.country = 'France'
order.emitter.phone = '01 00 00 00 00'
order.emitter.mail = 'contact@dimsolution.com'
order.emitter.website = 'www.dimsolution.com'
```

Return order object
```js
order.getOrder()
```

Return html order
```js
order.getOrder().toHTML()
```

Save html order into file (default filepath: 'order.html')
```js
order.getOrder().toHTML().toFile('./order.html')
```

Save html order into file (default filepath: 'order.pdf')
```js
order.getOrder().toPDF().toFile('./order.pdf')
```

### Invoice

To generate an invoice:

```js
import ig from 'invoice-generator'

  let recipient = {
    company_name: 'Receiver company',
    first_name: 'Will',
    last_name: 'Jameson',
    street_number: '20',
    street_name: 'Rue Victor Hugo',
    zip_code: '77340',
    city: 'Pontault-Combault',
    country: 'France',
    phone: '06 00 00 00 00',
    mail: 'will.jameson@test.com'
  }

  let emitter = {
    name: 'Dim Solution',
    street_number: '15',
    street_name: 'Rue Jean Jaures',
    zip_code: '75012',
    city: 'Paris',
    country: 'France',
    phone: '01 00 00 00 00',
    mail: 'contact@dimsolution.com',
    website: 'www.dimsolution.com'
  }

  let invoice = generator.create(recipient, emitter)
```

You can also use getter / setters like that

```js
let invoice = generator.create()

invoice.recipient.company_name = 'Receiver company'
invoice.recipient.first_name = 'Will'
invoice.recipient.last_name = 'Jameson'
invoice.recipient.street_number = '20'
invoice.recipient.street_name = 'Rue Victor Hugo'
invoice.recipient.zip_code = '77340'
invoice.recipient.city = 'Pontault-Combault'
invoice.recipient.country = 'France'
invoice.recipient.phone = '06 00 00 00 00'
invoice.recipient.mail = 'will.jameson@test.com'

invoice.emitter.name = 'Dim Solution'
invoice.emitter.street_number = '15'
invoice.emitter.street_name = 'Rue Jean Jaures'
invoice.emitter.zip_code = '75012'
invoice.emitter.city = 'Paris'
invoice.emitter.country = 'France'
invoice.emitter.phone = '01 00 00 00 00'
invoice.emitter.mail = 'contact@dimsolution.com'
invoice.emitter.website = 'www.dimsolution.com'
```

Return invoice object
```js
invoice.getInvoice()
```

Return html invoice
```js
invoice.getInvoice().toHTML()
```

Save html invoice into file (default filepath: 'invoice.html')
```js
invoice.getInvoice().toHTML().toFile('./invoice.html')
```

Save html invoice into file (default filepath: 'invoice.pdf')
```js
invoice.getInvoice().toPDF().toFile('./invoice.pdf')
```

## License
MIT © [Dimitri DO BAIRRO](https://dimsolution.com)
