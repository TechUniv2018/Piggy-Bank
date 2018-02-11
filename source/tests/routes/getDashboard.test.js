const Server = require('../../server');
const Models = require('../../../models');

describe('Testing the hapi server for GET request', () => {
  beforeEach((done) => {
    Models.users.create({
      user_name: 'anmol5varma',
      password_digest: '$2a$10$ozeZZxOXWGSNw/OQUKG3sev5PdsydBPPa7R/RO9xyMyNg7eMOA2Ze', // codechefD12$
      user_firstname: 'Anmol',
      user_lastname: 'Varma',
      user_address: 'McKinsey Digital labs',
      user_phone: 8098469331,
      user_email: 'anmol5varma@gmail.com',
      user_dob: new Date(1996, 10, 26),
      user_gender: 'Male',
      user_pan: 'ABCDE1234F',
      user_pic: 'logo.jpg',
      user_fathername: 'Varma ji',
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then((result) => {
      done();
    });
  });
  afterEach((done) => {
    Models.users.destroy({
      where: {},
      truncate: true,
    }).then((result) => {
      done();
    });
  });
  test('Should return 200 status code for sucessful GET request', (done) => {
    const options = {
      method: 'GET',
      url: '/dashboard?username=John',
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('Should return message no such user exists sucessful GET request', (done) => {
    const options = {
      method: 'GET',
      url: '/dashboard?username=Jhn',
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('No such user exists');
      done();
    });
  });
});
