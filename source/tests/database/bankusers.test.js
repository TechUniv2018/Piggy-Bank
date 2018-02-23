const Models = require('../../../models');

const cleanUpAllTables = () => [Models.bankusers.destroy({ cascade: true, truncate: true }),
  Models.transactions.destroy({ cascade: true, truncate: true })];

describe('test bankusers table', () => {
  test('test bankusers table is created', (done) => {
    Models.bankusers.findAll().then((result) => {
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
// });

