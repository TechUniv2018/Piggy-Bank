const Server = require('../../server');
const Models = require('../../../models');

describe('Testing the hapi server for GET request', () => {
  beforeEach((done) => {
    Models.transactions.create({
      transactionId: 'transaction_0081500',
      transactionStatus: 'complete', // wearebest2D%
      transactionTimestamp: new Date(),
      fromAccount: 90351910,
      toAccount: 90351910,
      amount: 10000,
      transactionType: 'credit',
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then(() => {
      done();
    }).catch();
  });
  afterEach((done) => {
    Models.transactions.destroy({
      where: { transactionId: 'transaction_0081500' },
      truncate: true,
    }).then(() => {
      done();
    }).catch();
  });
  test('Should return 200 status code for sucessful GET request', (done) => {
    const options = {
      method: 'GET',
      url: '/user/miniStatement',
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('Responds with Not Found for invalid path', (done) => {
    const options = {
      method: 'GET',
      url: '/user/mini',
    };
    Server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(404);
      done();
    });
  });
});
