import generator from '../src/lib/generator'
import fs from 'fs'

describe('Invoice', () => {

  let htmlPathfile = 'dist/invoice.html'
  let pdfPathfile = 'dist/invoice.pdf'

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

  let article1 = {
    description: 'Apple - Macbook Pro',
    tax: 19.60,
    price: 952.09,
    qt: 3
  }

  let article2 = {
    description: 'Github licence',
    tax: 10,
    price: 79,
    qt: 1
  }

  let article3 = {
    description: 'Apple care 1 year',
    tax: 20,
    price: 100,
    qt: 3
  }

  it(`Object auto-filled`, (done) => {
    let invoice = generator.create(recipient, emitter)
    invoice.recipient().company_name.should.be.equal('Receiver company')
    invoice.recipient().first_name.should.be.equal('Will')
    invoice.recipient().last_name.should.be.equal('Jameson')
    invoice.recipient().street_number.should.be.equal('20')
    invoice.recipient().street_name.should.be.equal('Rue Victor Hugo')
    invoice.recipient().zip_code.should.be.equal('77340')
    invoice.recipient().city.should.be.equal('Pontault-Combault')
    invoice.recipient().country.should.be.equal('France')
    invoice.recipient().phone.should.be.equal('06 00 00 00 00')
    invoice.recipient().mail.should.be.equal('will.jameson@test.com')
    invoice.emitter().name.should.be.equal(`Dim Solution`)
    invoice.emitter().street_number.should.be.equal('15')
    invoice.emitter().street_name.should.be.equal('Rue Jean Jaures')
    invoice.emitter().zip_code.should.be.equal('75012')
    invoice.emitter().city.should.be.equal('Paris')
    invoice.emitter().country.should.be.equal('France')
    invoice.emitter().phone.should.be.equal('01 00 00 00 00')
    invoice.emitter().mail.should.be.equal('contact@dimsolution.com')
    invoice.emitter().website.should.be.equal('www.dimsolution.com')
    done()
  })

  it(`Object not auto-filled`, (done) => {
    let invoice = generator.create()
    invoice.emitter(emitter)
    invoice.recipient(recipient)
    invoice.recipient().company_name.should.be.equal('Receiver company')
    invoice.recipient().first_name.should.be.equal('Will')
    invoice.recipient().last_name.should.be.equal('Jameson')
    invoice.recipient().street_number.should.be.equal('20')
    invoice.recipient().street_name.should.be.equal('Rue Victor Hugo')
    invoice.recipient().zip_code.should.be.equal('77340')
    invoice.recipient().city.should.be.equal('Pontault-Combault')
    invoice.recipient().country.should.be.equal('France')
    invoice.recipient().phone.should.be.equal('06 00 00 00 00')
    invoice.recipient().mail.should.be.equal('will.jameson@test.com')
    invoice.emitter().name.should.be.equal(`Dim Solution`)
    invoice.emitter().street_number.should.be.equal('15')
    invoice.emitter().street_name.should.be.equal('Rue Jean Jaures')
    invoice.emitter().zip_code.should.be.equal('75012')
    invoice.emitter().city.should.be.equal('Paris')
    invoice.emitter().country.should.be.equal('France')
    invoice.emitter().phone.should.be.equal('01 00 00 00 00')
    invoice.emitter().mail.should.be.equal('contact@dimsolution.com')
    invoice.emitter().website.should.be.equal('www.dimsolution.com')
    done()
  })

  it(`Convert to HTML`, (done) => {
    let invoice = generator.create(recipient, emitter)
    invoice.getInvoice().toHTML().should.not.be.empty
    done()
  })

  it(`Export to HTML file`, (done) => {
    let invoice = generator.create(recipient, emitter)
    invoice.getInvoice().toHTML().toFile(htmlPathfile).then(() => done())
  }).timeout(15000)

  it(`Check HTML content file`, (done) => {
    let invoice = generator.create(recipient, emitter)
    invoice.getInvoice().toHTML().toFile(htmlPathfile)
      .then(() => {
        fs.readFile(htmlPathfile, 'utf8', (err, data) => {
          should.not.exist(err)
          data.should.not.be.empty
          done()
        })
      })
  }).timeout(15000)

  it(`Export to PDF file`, (done) => {
    let invoice = generator.create(recipient, emitter)
    invoice.getInvoice().toPDF().toFile(pdfPathfile).then(() => done())
  }).timeout(15000)

  it(`Check PDF content file`, (done) => {
    let invoice = generator.create(recipient, emitter)
    invoice.getInvoice().toPDF().toFile(pdfPathfile).then(() => {
      fs.readFile(pdfPathfile, 'utf8', (err, data) => {
        should.not.exist(err)
        data.should.be.ok
        done()
      })
    })

  }).timeout(15000)

  it(`Add multiple articles from array`, (done) => {
    let invoice = generator.create(recipient, emitter)
    invoice.article = [article1, article2]
    invoice.article.length.should.be.equal(2)
    invoice.article[0].description.should.be.equal('Apple - Macbook Pro')
    invoice.article[0].tax.should.be.equal('19.60')
    invoice.article[0].price.should.be.equal('952.09')
    invoice.article[0].qt.should.be.equal(3)
    invoice.article[0].total_product_without_taxes.should.be.equal('2856.27')
    invoice.article[0].total_product_taxes.should.be.equal('559.83')
    invoice.article[0].total_product_with_taxes.should.be.equal('3416.10')
    invoice.article[1].description.should.be.equal('Github licence')
    invoice.article[1].tax.should.be.equal('10.00')
    invoice.article[1].price.should.be.equal('79.00')
    invoice.article[1].qt.should.be.equal(1)
    invoice.article[1].total_product_without_taxes.should.be.equal('79.00')
    invoice.article[1].total_product_taxes.should.be.equal('7.90')
    invoice.article[1].total_product_with_taxes.should.be.equal('86.90')
    invoice.article = article3
    invoice.article[2].description.should.be.equal('Apple care 1 year')
    invoice.article[2].tax.should.be.equal('20.00')
    invoice.article[2].price.should.be.equal('100.00')
    invoice.article[2].qt.should.be.equal(3)
    invoice.article[2].total_product_without_taxes.should.be.equal('300.00')
    invoice.article[2].total_product_taxes.should.be.equal('60.00')
    invoice.article[2].total_product_with_taxes.should.be.equal('360.00')
    done()
  })

  it(`Add article from article object`, (done) => {
    let invoice = generator.create(recipient, emitter)
    invoice.article = article1
    invoice.article = article2
    invoice.article.length.should.be.equal(2)
    invoice.article[0].description.should.be.equal('Apple - Macbook Pro')
    invoice.article[0].tax.should.be.equal('19.60')
    invoice.article[0].price.should.be.equal('952.09')
    invoice.article[0].qt.should.be.equal(3)
    invoice.article[0].total_product_without_taxes.should.be.equal('2856.27')
    invoice.article[0].total_product_taxes.should.be.equal('559.83')
    invoice.article[0].total_product_with_taxes.should.be.equal('3416.10')
    invoice.article[1].description.should.be.equal('Github licence')
    invoice.article[1].tax.should.be.equal('10.00')
    invoice.article[1].price.should.be.equal('79.00')
    invoice.article[1].qt.should.be.equal(1)
    invoice.article[1].total_product_without_taxes.should.be.equal('79.00')
    invoice.article[1].total_product_taxes.should.be.equal('7.90')
    invoice.article[1].total_product_with_taxes.should.be.equal('86.90')
    invoice.article = [article3]
    invoice.article[2].description.should.be.equal('Apple care 1 year')
    invoice.article[2].tax.should.be.equal('20.00')
    invoice.article[2].price.should.be.equal('100.00')
    invoice.article[2].qt.should.be.equal(3)
    invoice.article[2].total_product_without_taxes.should.be.equal('300.00')
    invoice.article[2].total_product_taxes.should.be.equal('60.00')
    invoice.article[2].total_product_with_taxes.should.be.equal('360.00')
    invoice.total_inc_taxes.should.be.equal(3863)
    invoice.total_exc_taxes.should.be.equal(3235.27)
    invoice.total_taxes.should.be.equal(627.73)
    invoice.getInvoice().toHTML().toFile(htmlPathfile).then(() => {
      return invoice.getInvoice().toPDF().toFile(pdfPathfile)
        .then(() => done())
    })
  }).timeout(15000)

  it(`Delete all articles`, (done) => {
    let invoice = generator.create(recipient, emitter)
    invoice.article = article1
    invoice.article = article2
    invoice.article.length.should.be.equal(2)
    invoice.deleteArticles()
    invoice.article.length.should.be.equal(0)
    done()
  })

  it(`Get totals from array`, (done) => {
    let invoice = generator.create(recipient, emitter)
    invoice.article = [article1, article2]
    invoice.total_exc_taxes.should.be.equal(2935.27)
    invoice.total_taxes.should.be.equal(567.73)
    invoice.total_inc_taxes.should.be.equal(3503)
    invoice.article = [article3]
    invoice.total_exc_taxes.should.be.equal(3235.27)
    invoice.total_taxes.should.be.equal(627.73)
    invoice.total_inc_taxes.should.be.equal(3863)
    invoice.formatOutputNumber(invoice.total_exc_taxes).should.be.equal('3235.27')
    invoice.formatOutputNumber(invoice.total_taxes).should.be.equal('627.73')
    invoice.formatOutputNumber(invoice.total_inc_taxes).should.be.equal('3863.00')
    done()
  })

})
