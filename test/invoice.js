import chai from 'chai'
import generator from '../lib/generator'
chai.should()

describe('Invoice', () => {

  it(`Object auto-filled`, (done) => {
    let invoice = generator.create({
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
    }, {
      name: 'Dim Solution',
      street_number: '15',
      street_name: 'Rue Jean Jaures',
      zip_code: '75012',
      city: 'Paris',
      country: 'France',
      phone: '01 00 00 00 00',
      mail: 'contact@dimsolution.com',
      website: 'www.dimsolution.com'
    })

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
    invoice.emitter({
      name: 'Dim Solution',
      street_number: '15',
      street_name: 'Rue Jean Jaures',
      zip_code: '75012',
      city: 'Paris',
      country: 'France',
      phone: '01 00 00 00 00',
      mail: 'contact@dimsolution.com',
      website: 'www.dimsolution.com'
    })
    invoice.recipient({
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
    })

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

  it(`Export to HTML`, (done) => {
    done()
  })

  it(`Export to PDF`, (done) => {
    done()
  })

})
