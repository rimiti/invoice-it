import chai from 'chai'
import generator from '../lib/generator'
import fs from 'fs'
let should = chai.should()

describe('Order', () => {

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

  it(`Object auto-filled`, (done) => {
    let order = generator.create(recipient, emitter)
    order.recipient().company_name.should.be.equal('Receiver company')
    order.recipient().first_name.should.be.equal('Will')
    order.recipient().last_name.should.be.equal('Jameson')
    order.recipient().street_number.should.be.equal('20')
    order.recipient().street_name.should.be.equal('Rue Victor Hugo')
    order.recipient().zip_code.should.be.equal('77340')
    order.recipient().city.should.be.equal('Pontault-Combault')
    order.recipient().country.should.be.equal('France')
    order.recipient().phone.should.be.equal('06 00 00 00 00')
    order.recipient().mail.should.be.equal('will.jameson@test.com')
    order.emitter().name.should.be.equal(`Dim Solution`)
    order.emitter().street_number.should.be.equal('15')
    order.emitter().street_name.should.be.equal('Rue Jean Jaures')
    order.emitter().zip_code.should.be.equal('75012')
    order.emitter().city.should.be.equal('Paris')
    order.emitter().country.should.be.equal('France')
    order.emitter().phone.should.be.equal('01 00 00 00 00')
    order.emitter().mail.should.be.equal('contact@dimsolution.com')
    order.emitter().website.should.be.equal('www.dimsolution.com')
    done()
  })

  it(`Object not auto-filled`, (done) => {
    let order = generator.create()
    order.emitter(emitter)
    order.recipient(recipient)
    order.recipient().company_name.should.be.equal('Receiver company')
    order.recipient().first_name.should.be.equal('Will')
    order.recipient().last_name.should.be.equal('Jameson')
    order.recipient().street_number.should.be.equal('20')
    order.recipient().street_name.should.be.equal('Rue Victor Hugo')
    order.recipient().zip_code.should.be.equal('77340')
    order.recipient().city.should.be.equal('Pontault-Combault')
    order.recipient().country.should.be.equal('France')
    order.recipient().phone.should.be.equal('06 00 00 00 00')
    order.recipient().mail.should.be.equal('will.jameson@test.com')
    order.emitter().name.should.be.equal(`Dim Solution`)
    order.emitter().street_number.should.be.equal('15')
    order.emitter().street_name.should.be.equal('Rue Jean Jaures')
    order.emitter().zip_code.should.be.equal('75012')
    order.emitter().city.should.be.equal('Paris')
    order.emitter().country.should.be.equal('France')
    order.emitter().phone.should.be.equal('01 00 00 00 00')
    order.emitter().mail.should.be.equal('contact@dimsolution.com')
    order.emitter().website.should.be.equal('www.dimsolution.com')
    done()
  })

  it(`Convert to HTML`, (done) => {
    let order = generator.create(recipient, emitter)
    order.getOrder().toHTML().should.be.html
    done()
  })

  it(`Export to HTML file`, (done) => {
    let order = generator.create(recipient, emitter)
    order.getOrder().toHTML().toFile('dist/order.html')
    setTimeout(() => {
      fs.existsSync('dist/order.html').should.be.ok
      done()
    }, 1500)
  }).timeout(2000)

  it(`Check HTML content file`, (done) => {
    let order = generator.create(recipient, emitter)
    order.getOrder().toHTML().toFile('dist/order.html')
    setTimeout(() => {
      fs.readFile('dist/order.html', 'utf8', (err, data) => {
        should.not.exist(err)
        data.should.be.html
        done()
      })
    }, 1500)
  }).timeout(2000)

  it(`Export to PDF file`, (done) => {
    let order = generator.create(recipient, emitter)
    order.getOrder().toPDF().toFile('dist/order.pdf')
    done()
  }).timeout(1000)
})
