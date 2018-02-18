const server = require('../../server');
const Models = require('../../../models');


describe('Testing edit Password', () => {
  beforeEach((done) => {
    Models.bankusers.create({
      userName: 'paridhi',
      password: '$2a$10$uBqWq2mNznlnCisaC.i3UOahjcC9I4CYWy3gGr2w5/oCGCVur0wOm', // wearebest2D%
      firstName: 'Paridhi',
      lastName: 'Mohindra',
      phoneNumber: 8475375640,
      email: 'paridhi815@gmail.com',
      dob: new Date(1996, 10, 26),
      gender: 'Female',
      panCardNumber: 'ABCDE1234F',
      user_pic: '',
      fatherName: 'Mohindra ji',
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then(() => {
      done();
    }).catch();
  });
  afterEach((done) => {
    Models.bankusers.destroy({
      where: { userName: 'paridhi' },
      truncate: true,
    }).then(() => {
      done();
    }).catch();
  });
  test('Responds with message for invalid password', (done) => {
    const options = {
      method: 'POST',
      url: '/users/password',
      payload: { userName: 'paridhi', password: 'WrongPassword' },
    };
    server.inject(options, (response) => {
      expect(response.result.message).toBe('Wrong Password');
      done();
    });
  });
  test('Responds with message for invalid new password format', (done) => {
    const options = {
      method: 'POST',
      url: '/users/password',
      payload: {
        userName: 'paridhi', password: 'wearebest2D%', password1: 'wrong format', password2: 'wearebest2D%',
      },
    };
    server.inject(options, (response) => {
      expect(response.result.message).toBe('Incorrect password format');
      done();
    });
  });
  test('Responds with message for new passwords that do not match', (done) => {
    const options = {
      method: 'POST',
      url: '/users/password',
      payload: {
        userName: 'paridhi', password: 'wearebest2D%', password1: 'wearebest4D%', password2: 'wearebest3D%',
      },
    };
    server.inject(options, (response) => {
      expect(response.result.message).toBe('Passwords do not match');
      done();
    });
  });
  test('Responds with message for updated password', (done) => {
    const options = {
      method: 'POST',
      url: '/users/password',
      payload: {
        userName: 'paridhi', password: 'wearebest2D%', password1: 'wearebest3D%', password2: 'wearebest3D%',
      },
    };
    server.inject(options, (response) => {
      expect(response.result.message).toBe('Password updated successfully');
      done();
    });
  });
});

