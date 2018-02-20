import fs from 'fs';
import invoiceIt from '../src';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;
jest.setTimeout(90000);

describe('Invoice', () => {
  const htmlPathfile = './invoice.html';
  const pdfPathfile = './invoice.pdf';

  const recipient = {
    company_name: 'Receiver company',
    first_name: 'Will',
    last_name: 'Jameson',
    street_number: '20',
    street_name: 'Rue Victor Hugo',
    zip_code: '77340',
    city: 'Pontault-Combault',
    country: 'France',
    phone: '06 00 00 00 00',
    mail: 'will.jameson@test.com',
  };

  const emitter = {
    name: 'Dim Solution',
    street_number: '15',
    street_name: 'Rue Jean Jaures',
    zip_code: '75012',
    city: 'Paris',
    country: 'France',
    phone: '01 00 00 00 00',
    mail: 'contact@dimsolution.com',
    website: 'www.dimsolution.com',
  };

  const article1 = {
    description: 'Apple - Macbook Pro',
    tax: 19.60,
    price: 952.09,
    qt: 3,
  };

  const article2 = {
    description: 'Github licence',
    tax: 10,
    price: 79,
    qt: 1,
  };

  const article3 = {
    description: 'Apple care 1 year',
    tax: 20,
    price: 100,
    qt: 3,
  };

  it('Object auto-filled', (done) => {
    const invoice = invoiceIt.create(recipient, emitter);
    expect(invoice.recipient().company_name).toEqual('Receiver company');
    expect(invoice.recipient().first_name).toEqual('Will');
    expect(invoice.recipient().last_name).toEqual('Jameson');
    expect(invoice.recipient().street_number).toEqual('20');
    expect(invoice.recipient().street_name).toEqual('Rue Victor Hugo');
    expect(invoice.recipient().zip_code).toEqual('77340');
    expect(invoice.recipient().city).toEqual('Pontault-Combault');
    expect(invoice.recipient().country).toEqual('France');
    expect(invoice.recipient().phone).toEqual('06 00 00 00 00');
    expect(invoice.recipient().mail).toEqual('will.jameson@test.com');
    expect(invoice.emitter().name).toEqual('Dim Solution');
    expect(invoice.emitter().street_number).toEqual('15');
    expect(invoice.emitter().street_name).toEqual('Rue Jean Jaures');
    expect(invoice.emitter().zip_code).toEqual('75012');
    expect(invoice.emitter().city).toEqual('Paris');
    expect(invoice.emitter().country).toEqual('France');
    expect(invoice.emitter().phone).toEqual('01 00 00 00 00');
    expect(invoice.emitter().mail).toEqual('contact@dimsolution.com');
    expect(invoice.emitter().website).toEqual('www.dimsolution.com');
    done();
  });

  it('Object not auto-filled', (done) => {
    const invoice = invoiceIt.create();
    invoice.emitter(emitter);
    invoice.recipient(recipient);
    expect(invoice.recipient().company_name).toEqual('Receiver company');
    expect(invoice.recipient().first_name).toEqual('Will');
    expect(invoice.recipient().last_name).toEqual('Jameson');
    expect(invoice.recipient().street_number).toEqual('20');
    expect(invoice.recipient().street_name).toEqual('Rue Victor Hugo');
    expect(invoice.recipient().zip_code).toEqual('77340');
    expect(invoice.recipient().city).toEqual('Pontault-Combault');
    expect(invoice.recipient().country).toEqual('France');
    expect(invoice.recipient().phone).toEqual('06 00 00 00 00');
    expect(invoice.recipient().mail).toEqual('will.jameson@test.com');
    expect(invoice.emitter().name).toEqual('Dim Solution');
    expect(invoice.emitter().street_number).toEqual('15');
    expect(invoice.emitter().street_name).toEqual('Rue Jean Jaures');
    expect(invoice.emitter().zip_code).toEqual('75012');
    expect(invoice.emitter().city).toEqual('Paris');
    expect(invoice.emitter().country).toEqual('France');
    expect(invoice.emitter().phone).toEqual('01 00 00 00 00');
    expect(invoice.emitter().mail).toEqual('contact@dimsolution.com');
    expect(invoice.emitter().website).toEqual('www.dimsolution.com');
    done();
  });

  it('Convert to HTML', (done) => {
    const invoice = invoiceIt.create(recipient, emitter);
    expect(typeof invoice.getInvoice().toHTML() === 'object');
    done();
  });

  it('Export to HTML file', (done) => {
    const invoice = invoiceIt.create(recipient, emitter);
    invoice.getInvoice().toHTML().toFile(htmlPathfile)
      .then(() => done());
  });

  it('Check HTML content file', (done) => {
    const invoice = invoiceIt.create(recipient, emitter);
    invoice.getInvoice().toHTML().toFile(htmlPathfile)
      .then(() => {
        fs.readFile(htmlPathfile, 'utf8', (err, data) => {
          expect(!err);
          expect(data === 'object');
          done();
        });
      });
  });

  it('Export to PDF file', (done) => {
    const invoice = invoiceIt.create(recipient, emitter);
    invoice.getInvoice().toPDF().toFile(pdfPathfile).then(() => done());
  });

  it('Check PDF content file', (done) => {
    const invoice = invoiceIt.create(recipient, emitter);
    invoice.getInvoice().toPDF().toFile(pdfPathfile).then(() => {
      fs.readFile(pdfPathfile, 'utf8', (err, data) => {
        expect(!err);
        expect(data);
        done();
      });
    });
  });

  it('Add multiple articles from array', (done) => {
    const invoice = invoiceIt.create(recipient, emitter);
    invoice.article = [article1, article2];
    expect(invoice.article).toHaveLength(2);
    expect(invoice.article[0].description).toEqual('Apple - Macbook Pro');
    expect(invoice.article[0].tax).toEqual('19.60');
    expect(invoice.article[0].price).toEqual('952.09');
    expect(invoice.article[0].qt).toEqual(3);
    expect(invoice.article[0].total_product_without_taxes).toEqual('2856.27');
    expect(invoice.article[0].total_product_taxes).toEqual('559.83');
    expect(invoice.article[0].total_product_with_taxes).toEqual('3416.10');
    expect(invoice.article[1].description).toEqual('Github licence');
    expect(invoice.article[1].tax).toEqual('10.00');
    expect(invoice.article[1].price).toEqual('79.00');
    expect(invoice.article[1].qt).toEqual(1);
    expect(invoice.article[1].total_product_without_taxes).toEqual('79.00');
    expect(invoice.article[1].total_product_taxes).toEqual('7.90');
    expect(invoice.article[1].total_product_with_taxes).toEqual('86.90');
    invoice.article = article3;
    expect(invoice.article[2].description).toEqual('Apple care 1 year');
    expect(invoice.article[2].tax).toEqual('20.00');
    expect(invoice.article[2].price).toEqual('100.00');
    expect(invoice.article[2].qt).toEqual(3);
    expect(invoice.article[2].total_product_without_taxes).toEqual('300.00');
    expect(invoice.article[2].total_product_taxes).toEqual('60.00');
    expect(invoice.article[2].total_product_with_taxes).toEqual('360.00');
    done();
  });

  it('Add article from article object', (done) => {
    const invoice = invoiceIt.create(recipient, emitter);
    invoice.article = article1;
    invoice.article = article2;
    expect(invoice.article).toHaveLength(2);
    expect(invoice.article[0].description).toEqual('Apple - Macbook Pro');
    expect(invoice.article[0].tax).toEqual('19.60');
    expect(invoice.article[0].price).toEqual('952.09');
    expect(invoice.article[0].qt).toEqual(3);
    expect(invoice.article[0].total_product_without_taxes).toEqual('2856.27');
    expect(invoice.article[0].total_product_taxes).toEqual('559.83');
    expect(invoice.article[0].total_product_with_taxes).toEqual('3416.10');
    expect(invoice.article[1].description).toEqual('Github licence');
    expect(invoice.article[1].tax).toEqual('10.00');
    expect(invoice.article[1].price).toEqual('79.00');
    expect(invoice.article[1].qt).toEqual(1);
    expect(invoice.article[1].total_product_without_taxes).toEqual('79.00');
    expect(invoice.article[1].total_product_taxes).toEqual('7.90');
    expect(invoice.article[1].total_product_with_taxes).toEqual('86.90');
    invoice.article = [article3];
    expect(invoice.article[2].description).toEqual('Apple care 1 year');
    expect(invoice.article[2].tax).toEqual('20.00');
    expect(invoice.article[2].price).toEqual('100.00');
    expect(invoice.article[2].qt).toEqual(3);
    expect(invoice.article[2].total_product_without_taxes).toEqual('300.00');
    expect(invoice.article[2].total_product_taxes).toEqual('60.00');
    expect(invoice.article[2].total_product_with_taxes).toEqual('360.00');
    expect(invoice.total_inc_taxes).toEqual(3863);
    expect(invoice.total_exc_taxes).toEqual(3235.27);
    expect(invoice.total_taxes).toEqual(627.73);
    invoice.getInvoice().toHTML().toFile(htmlPathfile).then(() => invoice.getInvoice().toPDF().toFile(pdfPathfile)
      .then(() => done()));
  });

  it('Delete all articles', (done) => {
    const invoice = invoiceIt.create(recipient, emitter);
    invoice.article = article1;
    invoice.article = article2;
    expect(invoice.article).toHaveLength(2);
    invoice.deleteArticles();
    expect(invoice.article).toHaveLength(0);
    done();
  });

  it('Get totals from array', (done) => {
    const invoice = invoiceIt.create(recipient, emitter);
    invoice.article = [article1, article2];
    expect(invoice.total_exc_taxes).toEqual(2935.27);
    expect(invoice.total_taxes).toEqual(567.73);
    expect(invoice.total_inc_taxes).toEqual(3503);
    invoice.article = [article3];
    expect(invoice.total_exc_taxes).toEqual(3235.27);
    expect(invoice.total_taxes).toEqual(627.73);
    expect(invoice.total_inc_taxes).toEqual(3863);
    expect(invoice.formatOutputNumber(invoice.total_exc_taxes)).toEqual('3235.27');
    expect(invoice.formatOutputNumber(invoice.total_taxes)).toEqual('627.73');
    expect(invoice.formatOutputNumber(invoice.total_inc_taxes)).toEqual('3863.00');
    done();
  });
});
