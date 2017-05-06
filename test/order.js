import chai from 'chai'
import generator from '../lib/generator'
chai.should()

describe('Order', () => {

  it(`Object auto-filled`, (done) => {
    let order = generator.create({
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

  it(`Export to HTML`, (done) => {
    done()
  })

  it(`Export to PDF`, (done) => {
    done()
  })

})
