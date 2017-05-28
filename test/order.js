import chai from 'chai'
import generator from '../lib/generator'
import fs from 'fs'
let should = chai.should()

describe('Order', () => {

  let htmlPathfile = 'dist/order.html'
  let pdfPathfile = 'dist/order.pdf'

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
    tax: 20,
    price: 1200,
    qt: 1
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

  // it(`Object auto-filled`, (done) => {
  //   let order = generator.create(recipient, emitter)
  //   order.recipient().company_name.should.be.equal('Receiver company')
  //   order.recipient().first_name.should.be.equal('Will')
  //   order.recipient().last_name.should.be.equal('Jameson')
  //   order.recipient().street_number.should.be.equal('20')
  //   order.recipient().street_name.should.be.equal('Rue Victor Hugo')
  //   order.recipient().zip_code.should.be.equal('77340')
  //   order.recipient().city.should.be.equal('Pontault-Combault')
  //   order.recipient().country.should.be.equal('France')
  //   order.recipient().phone.should.be.equal('06 00 00 00 00')
  //   order.recipient().mail.should.be.equal('will.jameson@test.com')
  //   order.emitter().name.should.be.equal(`Dim Solution`)
  //   order.emitter().street_number.should.be.equal('15')
  //   order.emitter().street_name.should.be.equal('Rue Jean Jaures')
  //   order.emitter().zip_code.should.be.equal('75012')
  //   order.emitter().city.should.be.equal('Paris')
  //   order.emitter().country.should.be.equal('France')
  //   order.emitter().phone.should.be.equal('01 00 00 00 00')
  //   order.emitter().mail.should.be.equal('contact@dimsolution.com')
  //   order.emitter().website.should.be.equal('www.dimsolution.com')
  //   done()
  // })
  //
  // it(`Object not auto-filled`, (done) => {
  //   let order = generator.create()
  //   order.emitter(emitter)
  //   order.recipient(recipient)
  //   order.recipient().company_name.should.be.equal('Receiver company')
  //   order.recipient().first_name.should.be.equal('Will')
  //   order.recipient().last_name.should.be.equal('Jameson')
  //   order.recipient().street_number.should.be.equal('20')
  //   order.recipient().street_name.should.be.equal('Rue Victor Hugo')
  //   order.recipient().zip_code.should.be.equal('77340')
  //   order.recipient().city.should.be.equal('Pontault-Combault')
  //   order.recipient().country.should.be.equal('France')
  //   order.recipient().phone.should.be.equal('06 00 00 00 00')
  //   order.recipient().mail.should.be.equal('will.jameson@test.com')
  //   order.emitter().name.should.be.equal(`Dim Solution`)
  //   order.emitter().street_number.should.be.equal('15')
  //   order.emitter().street_name.should.be.equal('Rue Jean Jaures')
  //   order.emitter().zip_code.should.be.equal('75012')
  //   order.emitter().city.should.be.equal('Paris')
  //   order.emitter().country.should.be.equal('France')
  //   order.emitter().phone.should.be.equal('01 00 00 00 00')
  //   order.emitter().mail.should.be.equal('contact@dimsolution.com')
  //   order.emitter().website.should.be.equal('www.dimsolution.com')
  //   done()
  // })
  //
  // it(`Convert to HTML`, (done) => {
  //   let order = generator.create(recipient, emitter)
  //   order.getOrder().toHTML().should.be.html
  //   done()
  // })
  //
  // it(`Export to HTML file`, (done) => {
  //   let order = generator.create(recipient, emitter)
  //   order.getOrder().toHTML().toFile(htmlPathfile)
  //   setTimeout(() => {
  //     fs.existsSync(htmlPathfile).should.be.ok
  //     done()
  //   }, 1500)
  // }).timeout(2000)
  //
  // it(`Check HTML content file`, (done) => {
  //   let order = generator.create(recipient, emitter)
  //   order.getOrder().toHTML().toFile(htmlPathfile)
  //   setTimeout(() => {
  //     fs.readFile(htmlPathfile, 'utf8', (err, data) => {
  //       should.not.exist(err)
  //       data.should.be.html
  //       done()
  //     })
  //   }, 1500)
  // }).timeout(2000)
  //
  // it(`Export to PDF file`, (done) => {
  //   let order = generator.create(recipient, emitter)
  //   order.getOrder().toPDF().toFile(pdfPathfile)
  //   setTimeout(() => {
  //     fs.existsSync(pdfPathfile).should.be.ok
  //     done()
  //   }, 10000)
  // }).timeout(12000)
  //
  // it(`Check PDF content file`, (done) => {
  //   let order = generator.create(recipient, emitter)
  //   order.getOrder().toPDF().toFile(pdfPathfile)
  //   setTimeout(() => {
  //     fs.readFile(pdfPathfile, 'utf8', (err, data) => {
  //       should.not.exist(err)
  //       data.should.be.ok
  //       done()
  //     })
  //   }, 10000)
  // }).timeout(12000)
  //
  // it(`Add multiple articles from array`, (done) => {
  //   let order = generator.create(recipient, emitter)
  //   order.article = [article1, article2]
  //   order.article.length.should.be.equal(2)
  //   order.article[0].description.should.be.equal('Apple - Macbook Pro')
  //   order.article[0].tax.should.be.equal(20)
  //   order.article[0].price.should.be.equal(1200)
  //   order.article[0].qt.should.be.equal(1)
  //   order.article[0].total_product_without_taxes.should.be.equal(1200)
  //   order.article[0].total_product_taxes.should.be.equal(240)
  //   order.article[0].total_product_with_taxes.should.be.equal(1440)
  //   order.article[1].description.should.be.equal('Github licence')
  //   order.article[1].tax.should.be.equal(10)
  //   order.article[1].price.should.be.equal(79)
  //   order.article[1].qt.should.be.equal(1)
  //   order.article[1].total_product_without_taxes.should.be.equal(79)
  //   order.article[1].total_product_taxes.should.be.equal(7.9)
  //   order.article[1].total_product_with_taxes.should.be.equal(86.9)
  //   order.article = article3
  //   order.article[2].description.should.be.equal('Apple care 1 year')
  //   order.article[2].tax.should.be.equal(20)
  //   order.article[2].price.should.be.equal(100)
  //   order.article[2].qt.should.be.equal(3)
  //   order.article[2].total_product_without_taxes.should.be.equal(300)
  //   order.article[2].total_product_taxes.should.be.equal(60)
  //   order.article[2].total_product_with_taxes.should.be.equal(360)
  //   done()
  // })
  //
  // it(`Add articles per articles`, (done) => {
  //   let order = generator.create(recipient, emitter)
  //   order.article = article1
  //   order.article = article2
  //   order.article.length.should.be.equal(2)
  //   order.article[0].description.should.be.equal('Apple - Macbook Pro')
  //   order.article[0].tax.should.be.equal(20)
  //   order.article[0].price.should.be.equal(1200)
  //   order.article[0].qt.should.be.equal(1)
  //   order.article[0].total_product_without_taxes.should.be.equal(1200)
  //   order.article[0].total_product_taxes.should.be.equal(240)
  //   order.article[0].total_product_with_taxes.should.be.equal(1440)
  //   order.article[1].description.should.be.equal('Github licence')
  //   order.article[1].tax.should.be.equal(10)
  //   order.article[1].price.should.be.equal(79)
  //   order.article[1].qt.should.be.equal(1)
  //   order.article[1].total_product_without_taxes.should.be.equal(79)
  //   order.article[1].total_product_taxes.should.be.equal(7.9)
  //   order.article[1].total_product_with_taxes.should.be.equal(86.9)
  //   order.article = [article3]
  //   order.article[2].description.should.be.equal('Apple care 1 year')
  //   order.article[2].tax.should.be.equal(20)
  //   order.article[2].price.should.be.equal(100)
  //   order.article[2].qt.should.be.equal(3)
  //   order.article[2].total_product_without_taxes.should.be.equal(300)
  //   order.article[2].total_product_taxes.should.be.equal(60)
  //   order.article[2].total_product_with_taxes.should.be.equal(360)
  //   done()
  // })
  //
  // it(`Delete all articles`, (done) => {
  //   let order = generator.create(recipient, emitter)
  //   order.article = article1
  //   order.article = article2
  //   order.article.length.should.be.equal(2)
  //   order.deleteArticles()
  //   order.article.length.should.be.equal(0)
  //   done()
  // })

  it(`Get totals from array`, (done) => {
    let order = generator.create(recipient, emitter)
    console.log(order.pad(10.94352))
    console.log(order.pad(10.94352, 'right'))
    console.log(order.round(10.94352))
    // order.article = [article1, article2]
    // order.total_exc_taxes.should.be.equal(1279)
    // order.total_taxes.should.be.equal(247.9)
    // order.total_inc_taxes.should.be.equal(1526.9)
    // order.article = [article3]
    // order.total_exc_taxes.should.be.equal(1579)
    // order.total_taxes.should.be.equal(307.9)
    // order.total_inc_taxes.should.be.equal(1886.9)
    // console.log(order.total_taxes)
    // console.log(order.total_inc_taxes)
    // console.log(order.total_exc_taxes)
    done()
  })


})

// Next steps
// 2. Gérer la traduction à la demande (via getter / setter + conf)
// 4. Gérer les items
// 5. Gérer la pagination en fonction du nombre d'items
