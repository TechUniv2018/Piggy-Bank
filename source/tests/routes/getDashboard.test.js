const Server = require('../../server');
const Models = require('../../../models');

describe('Testing the hapi server for GET request', () => {
  beforeEach((done) => {
    Models.bankusers.create({
      userName: 'anmol5varma',
      password_digest: '$2a$10$ozeZZxOXWGSNw/OQUKG3sev5PdsydBPPa7R/RO9xyMyNg7eMOA2Ze', // codechefD12$
      firstName: 'Anmol',
      lastName: 'Varma',
      // address: 'McKinsey Digital labs',
      phoneNumber: 8098469331,
      email: 'anmol5varma@gmail.com',
      dob: new Date(1996, 10, 26),
      gender: 'Male',
      pan: 'ABCDE1234F',
      pic: 'logo.jpg',
      fathername: 'Varma ji',
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then((result) => {
      done();
    });
  });
  afterEach((done) => {
    Models.bankusers.destroy({
      where: {},
      truncate: true,
    }).then((result) => {
      done();
    });
  });
  test('Should return 200 status code for sucessful GET request', (done) => {
    const options = {
      method: 'GET',
      url: '/dashboard?username=anmol5varma',
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  // test('Should return message no such user exists sucessful GET request', (done) => {
  //   const options = {
  //     method: 'GET',
  //     url: '/dashboard?username=John',
  //   };
  //   Server.inject(options, (response) => {
  //     expect(response.result.message).toBe('No such user exists');
  //     done();
  //   });
  //   const mockFn = jest.fn(cb => cb(null, resultObject)).mockName('response.view');
  //   expect(mockFn).toHaveBeenCalled();
  // });
});
