

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
