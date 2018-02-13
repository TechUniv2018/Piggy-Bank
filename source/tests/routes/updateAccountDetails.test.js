const Server = require('../../server');
const Models = require('../../../models');


describe('Server test', () => {
  test('Responds with success for valid request', (done) => {
    const options = {
      method: 'PUT',
      url: '/users/update',
      payload: {
        userName: 'pari',
        email: 'p@gmail.com',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(201);
      done();
    });
  });
  test('Responds with Not Found for invalid path', (done) => {
    const options = {
      method: 'PUT',
      url: '/12345',
    };
    Server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(404);
      done();
    });
  });
  test('response message verified', (done) => {
    const options = {
      method: 'PUT',
      url: '/users/update',
      payload: {
        userName: 'pari',
        email: 'p@gmail.com',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('Details Changed');
      done();
    });
  });
  test('Check for Null cases', (done) => {
    const options = {
      method: 'PUT',
      url: '/users/update',
      payload: {
        userName: 'pari',
        email: 'pari@gmail.com',
        firstName: null,
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('Details Changed');
      done();
    });
  });
  test('Check for undefined cases', (done) => {
    const options = {
      method: 'PUT',
      url: '/users/update',
      payload: {
        userName: 'paridhi',
        email: undefined,
        firstName: 'paridhiMohindra',
        lastName: undefined,
        phone: '9035191084',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('Details Changed');
      done();
    });
  });
  test('Check When no value is passed in the field', (done) => {
    const options = {
      method: 'PUT',
      url: '/users/update',
      payload: {
        userName: 'paridhi',
        email: 'paridhi_mohindra@mckinsey.com',
        firstName: 'paridhi',
        lastName: 'mohindra',
        phone: '',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('Details Changed');
      done();
    });
  });
  test('Check If it updates a row in the database', (done) => {
    const options = {
      method: 'PUT',
      url: '/users/update',
      payload: {
        userName: 'John_1234',
        email: 'paridhi_mohindra@mckinsey.com',
        firstName: 'paridhi',
        lastName: 'mohindra',
        phone: '8092298179',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.updateFlag).toEqual([1]);
      done();
    });
  });
});
