import fs from 'fs';
import invoiceIt from '../src';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;
jest.setTimeout(90000);

describe('Order', () => {
  const htmlPathfile = './order.html';
  const pdfPathfile = './order.pdf';

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
    const order = invoiceIt.create(recipient, emitter);
    expect(order.recipient().company_name).toEqual('Receiver company');
    expect(order.recipient().first_name).toEqual('Will');
    expect(order.recipient().last_name).toEqual('Jameson');
    expect(order.recipient().street_number).toEqual('20');
    expect(order.recipient().street_name).toEqual('Rue Victor Hugo');
    expect(order.recipient().zip_code).toEqual('77340');
    expect(order.recipient().city).toEqual('Pontault-Combault');
    expect(order.recipient().country).toEqual('France');
    expect(order.recipient().phone).toEqual('06 00 00 00 00');
    expect(order.recipient().mail).toEqual('will.jameson@test.com');
    expect(order.emitter().name).toEqual('Dim Solution');
    expect(order.emitter().street_number).toEqual('15');
    expect(order.emitter().street_name).toEqual('Rue Jean Jaures');
    expect(order.emitter().zip_code).toEqual('75012');
    expect(order.emitter().city).toEqual('Paris');
    expect(order.emitter().country).toEqual('France');
    expect(order.emitter().phone).toEqual('01 00 00 00 00');
    expect(order.emitter().mail).toEqual('contact@dimsolution.com');
    expect(order.emitter().website).toEqual('www.dimsolution.com');
    done();
  });

  it('Object not auto-filled', (done) => {
    const order = invoiceIt.create();
    order.emitter(emitter);
    order.recipient(recipient);
    expect(order.recipient().company_name).toEqual('Receiver company');
    expect(order.recipient().first_name).toEqual('Will');
    expect(order.recipient().last_name).toEqual('Jameson');
    expect(order.recipient().street_number).toEqual('20');
    expect(order.recipient().street_name).toEqual('Rue Victor Hugo');
    expect(order.recipient().zip_code).toEqual('77340');
    expect(order.recipient().city).toEqual('Pontault-Combault');
    expect(order.recipient().country).toEqual('France');
    expect(order.recipient().phone).toEqual('06 00 00 00 00');
    expect(order.recipient().mail).toEqual('will.jameson@test.com');
    expect(order.emitter().name).toEqual('Dim Solution');
    expect(order.emitter().street_number).toEqual('15');
    expect(order.emitter().street_name).toEqual('Rue Jean Jaures');
    expect(order.emitter().zip_code).toEqual('75012');
    expect(order.emitter().city).toEqual('Paris');
    expect(order.emitter().country).toEqual('France');
    expect(order.emitter().phone).toEqual('01 00 00 00 00');
    expect(order.emitter().mail).toEqual('contact@dimsolution.com');
    expect(order.emitter().website).toEqual('www.dimsolution.com');
    done();
  });

  it('Convert to HTML', (done) => {
    const order = invoiceIt.create(recipient, emitter);
    expect(order.getOrder().toHTML());
    done();
  });

  it('Export to HTML file', (done) => {
    const order = invoiceIt.create(recipient, emitter);
    order.getOrder().toHTML().toFile(htmlPathfile).then(() => done());
  });

  it('Check HTML content file', (done) => {
    const order = invoiceIt.create(recipient, emitter);
    order.getOrder().toHTML().toFile(htmlPathfile)
      .then(() => {
        fs.readFile(htmlPathfile, 'utf8', (err, data) => {
          expect(!err);
          expect(data);
          done();
        });
      });
  });

  it('Export to PDF file', (done) => {
    const order = invoiceIt.create(recipient, emitter);
    order.getOrder().toPDF().toFile(pdfPathfile).then(() => done());
  });

  it('Check PDF content file', (done) => {
    const order = invoiceIt.create(recipient, emitter);
    order.getOrder().toPDF().toFile(pdfPathfile).then(() => {
      fs.readFile(pdfPathfile, 'utf8', (err, data) => {
        expect(!err);
        expect(data);
        done();
      });
    });
  });

  it('Add multiple articles from array', (done) => {
    const order = invoiceIt.create(recipient, emitter);
    order.article = [article1, article2];
    expect(order.article).toHaveLength(2);
    expect(order.article[0].description).toEqual('Apple - Macbook Pro');
    expect(order.article[0].tax).toEqual('19.60');
    expect(order.article[0].price).toEqual('952.09');
    expect(order.article[0].qt).toEqual(3);
    expect(order.article[0].total_product_without_taxes).toEqual('2856.27');
    expect(order.article[0].total_product_taxes).toEqual('559.83');
    expect(order.article[0].total_product_with_taxes).toEqual('3416.10');
    expect(order.article[1].description).toEqual('Github licence');
    expect(order.article[1].tax).toEqual('10.00');
    expect(order.article[1].price).toEqual('79.00');
    expect(order.article[1].qt).toEqual(1);
    expect(order.article[1].total_product_without_taxes).toEqual('79.00');
    expect(order.article[1].total_product_taxes).toEqual('7.90');
    expect(order.article[1].total_product_with_taxes).toEqual('86.90');
    order.article = article3;
    expect(order.article[2].description).toEqual('Apple care 1 year');
    expect(order.article[2].tax).toEqual('20.00');
    expect(order.article[2].price).toEqual('100.00');
    expect(order.article[2].qt).toEqual(3);
    expect(order.article[2].total_product_without_taxes).toEqual('300.00');
    expect(order.article[2].total_product_taxes).toEqual('60.00');
    expect(order.article[2].total_product_with_taxes).toEqual('360.00');
    done();
  });

  it('Add article from article object', (done) => {
    const order = invoiceIt.create(recipient, emitter);
    order.article = article1;
    order.article = article2;
    expect(order.article).toHaveLength(2);
    expect(order.article[0].description).toEqual('Apple - Macbook Pro');
    expect(order.article[0].tax).toEqual('19.60');
    expect(order.article[0].price).toEqual('952.09');
    expect(order.article[0].qt).toEqual(3);
    expect(order.article[0].total_product_without_taxes).toEqual('2856.27');
    expect(order.article[0].total_product_taxes).toEqual('559.83');
    expect(order.article[0].total_product_with_taxes).toEqual('3416.10');
    expect(order.article[1].description).toEqual('Github licence');
    expect(order.article[1].tax).toEqual('10.00');
    expect(order.article[1].price).toEqual('79.00');
    expect(order.article[1].qt).toEqual(1);
    expect(order.article[1].total_product_without_taxes).toEqual('79.00');
    expect(order.article[1].total_product_taxes).toEqual('7.90');
    expect(order.article[1].total_product_with_taxes).toEqual('86.90');
    order.article = [article3];
    expect(order.article[2].description).toEqual('Apple care 1 year');
    expect(order.article[2].tax).toEqual('20.00');
    expect(order.article[2].price).toEqual('100.00');
    expect(order.article[2].qt).toEqual(3);
    expect(order.article[2].total_product_without_taxes).toEqual('300.00');
    expect(order.article[2].total_product_taxes).toEqual('60.00');
    expect(order.article[2].total_product_with_taxes).toEqual('360.00');
    expect(order.total_inc_taxes).toEqual(3863);
    expect(order.total_exc_taxes).toEqual(3235.27);
    expect(order.total_taxes).toEqual(627.73);
    order.getOrder().toHTML().toFile(htmlPathfile).then(() => order.getOrder().toPDF().toFile(pdfPathfile)
      .then(() => done()));
  });

  it('Delete all articles', (done) => {
    const order = invoiceIt.create(recipient, emitter);
    order.article = article1;
    order.article = article2;
    expect(order.article).toHaveLength(2);
    order.deleteArticles();
    expect(order.article).toHaveLength(0);
    done();
  });

  it('Get totals from array', (done) => {
    const order = invoiceIt.create(recipient, emitter);
    order.article = [article1, article2];
    expect(order.total_exc_taxes).toEqual(2935.27);
    expect(order.total_taxes).toEqual(567.73);
    expect(order.total_inc_taxes).toEqual(3503);
    order.article = [article3];
    expect(order.total_exc_taxes).toEqual(3235.27);
    expect(order.total_taxes).toEqual(627.73);
    expect(order.total_inc_taxes).toEqual(3863);
    expect(order.formatOutputNumber(order.total_exc_taxes)).toEqual('3235.27');
    expect(order.formatOutputNumber(order.total_taxes)).toEqual('627.73');
    expect(order.formatOutputNumber(order.total_inc_taxes)).toEqual('3863.00');
    done();
  });
});
