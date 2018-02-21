const Server = require('../../server');
const Models = require('../../../models');

describe('Testing the hapi server for GET request', () => {
  // beforeEach((done) => {
  //   Models.bankusers.create({
  //     username: 'anmol5varma',
  //     password: 'Scooby!23',
  //     cpassword: 'Scooby!23',
  //     firstName: 'Anmol',
  //     lastName: 'Varma',
  //     fatherName: 'email',
  //     email: 'anmol5varma@gmail.com',
  //     dob: '26-10-1996',
  //     contact: '9450134914',
  //     gender: 'Male',
  //     panCard: 'ABCDE1234F',
  //   }).then(() => {
  //     done();
  //   }).catch();
  // });

  afterEach((done) => {
    Models.user_authenticates.destroy({
      where: { userid: 'anmol5varma' },
      truncate: true,
    }).then(() => {
      done();
    }).catch();
  });

  test('Try adding an entry with less parameters', (done) => {
    const options = {
      method: 'POST',
      url: '/users',
      payload: {
        username: 'anmol5varma',
        password: 'Scooby!23',
        cpassword: 'Scooby!23',
        firstName: 'Anmol',
        lastName: 'Varma',
        fatherName: 'email',
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('Try adding an entry with invalid email', (done) => {
    const options = {
      method: 'POST',
      url: '/users',
      payload: {
        username: 'anmol5varma',
        password: 'Scooby!23',
        cpassword: 'Scooby!23',
        firstName: 'Anmol',
        lastName: 'Varma',
        fatherName: 'email',
        email: 'anmol5gmail.com',
        dob: '26-10-1996',
        contact: '9450134914',
        gender: 'Male',
        panCard: 'ABCDE1234F',
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
});
