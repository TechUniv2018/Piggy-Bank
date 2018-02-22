

const Models = require('../../../models');

const cleanUpAllTables = () => [Models.bankusers.destroy({ truncate: true }),
  Models.transactions.destroy({ truncate: true })];

describe('test transaction table', () => {
  test('test transactions table is created', (done) => {
    Models.transactions.findAll().then((result) => {
      expect(result).toEqual([]);
      done();
    });
  });
});

test('insert transaction into transaction table should be successful', (done) => {
  const date = new Date();
  const transactionObject = {
    transactionId: 'transaction_0081500',
    transactionStatus: 'complete', // wearebest2D%
    transactionTimestamp: date,
    fromAccount: 90351910,
    toAccount: 90351910,
    amount: 10000,
    transactionType: 'credit',
  };

  Models.transactions.create(transactionObject).then((resultTransaction) => {
    const transactionResultObject = {
      transactionId: resultTransaction.transactionId,
      transactionStatus: resultTransaction.transactionStatus,
      transactionTimestamp: resultTransaction.transactionTimestamp,
      fromAccount: resultTransaction.fromAccount,
      toAccount: resultTransaction.toAccount,
      amount: resultTransaction.amount,
      transactionType: resultTransaction.transactionType,
    };
    expect(transactionResultObject).toEqual(transactionObject);
    done();
  });
});

beforeEach((done) => {
  Promise.all(cleanUpAllTables()).then(() => {
    done();
  });
});

afterAll((done) => {
  Promise.all(cleanUpAllTables()).then(() => {
    done();
  });
});
