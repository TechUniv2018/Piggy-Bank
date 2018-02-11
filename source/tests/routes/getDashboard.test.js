const Server = require('../../server');
const Models = require('../../../models');

describe('Testing the hapi server for GET request', () => {
  beforeEach((done) => {
    Models.bankusers.create({
      userName: 'anmol5varma',
      password: '$2a$10$uBqWq2mNznlnCisaC.i3UOahjcC9I4CYWy3gGr2w5/oCGCVur0wOm', // wearebest2D%
      firstName: 'Anmol',
      lastName: 'Varma',
      phoneNumber: 8475375640,
      email: 'anmol5varma@gmail.com',
      dob: new Date(1996, 10, 26),
      gender: 'Male',
      panCardNumber: 'ABCDE1234F',
      user_pic: '',
      fatherName: 'Varma ji',
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then(() => {
      done();
    }).catch();
  });
  afterEach((done) => {
    Models.bankusers.destroy({
      where: { userName: 'anmol5varma' },
      truncate: true,
    }).then(() => {
      done();
    }).catch();
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
