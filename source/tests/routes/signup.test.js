const Server = require('../../server');
const Models = require('../../../models');

describe('Testing the hapi server for GET request', () => {
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

  test('Try adding an entry with invalid password', (done) => {
    const options = {
      method: 'POST',
      url: '/users',
      payload: {
        username: 'anmol5varma',
        password: 'Scoo23',
        cpassword: 'Scoo23',
        firstName: 'Anmol',
        lastName: 'Varma',
        fatherName: 'email',
        email: 'anmol5@gmail.com',
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

  test('Try adding an entry with different password and confirm password', (done) => {
    const options = {
      method: 'POST',
      url: '/users',
      payload: {
        username: 'anmol5varma',
        password: 'Scooby!23',
        cpassword: 'Scooby!43',
        firstName: 'Anmol',
        lastName: 'Varma',
        fatherName: 'email',
        email: 'anmol5@gmail.com',
        dob: '26-10-1996',
        contact: '9450134914',
        gender: 'Male',
        panCard: 'ABCDE1234F',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(401);
      expect(response.result.message).toBe('Passwords don\'t match');
      done();
    });
  });

  test('Try adding an entry with invalid date format', (done) => {
    const options = {
      method: 'POST',
      url: '/users',
      payload: {
        username: 'anmol5varma',
        password: 'Scooby!23',
        cpassword: 'Scooby!43',
        firstName: 'Anmol',
        lastName: 'Varma',
        fatherName: 'email',
        email: 'anmol5gmail.com',
        dob: '34-13-1996',
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

  test('Try adding an entry with invalid names', (done) => {
    const options = {
      method: 'POST',
      url: '/users',
      payload: {
        username: 'anmol5varma',
        password: 'Scooby!23',
        cpassword: 'Scooby!43',
        firstName: '123 asdasd',
        lastName: 'Varma',
        fatherName: '$54534sd',
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

  test('Try adding an entry with invalid gender value', (done) => {
    const options = {
      method: 'POST',
      url: '/users',
      payload: {
        username: 'anmol5varma',
        password: 'Scooby!23',
        cpassword: 'Scooby!43',
        firstName: 'Anmol',
        lastName: 'Varma',
        fatherName: 'email',
        email: 'anmol5gmail.com',
        dob: '26-10-1996',
        contact: '9450134914',
        gender: 'something',
        panCard: 'ABCDE1234F',
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('Try adding an entry with invalid contact number', (done) => {
    const options = {
      method: 'POST',
      url: '/users',
      payload: {
        username: 'anmol5varma',
        password: 'Scooby!23',
        cpassword: 'Scooby!43',
        firstName: 'Anmol',
        lastName: 'Varma',
        fatherName: 'email',
        email: 'anmol5gmail.com',
        dob: '26-10-1996',
        contact: '213345',
        gender: 'Male',
        panCard: 'ABCDE1234F',
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('Try adding an entry with invalid pan card number', (done) => {
    const options = {
      method: 'POST',
      url: '/users',
      payload: {
        username: 'anmol5varma',
        password: 'Scooby!23',
        cpassword: 'Scooby!43',
        firstName: 'Anmol',
        lastName: 'Varma',
        fatherName: 'email',
        email: 'anmol5gmail.com',
        dob: '26-10-1996',
        contact: '213345',
        gender: 'Male',
        panCard: '1234123445',
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('Adding a valid query', (done) => {
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
        email: 'anmol5@gmail.com',
        dob: '26-10-1996',
        contact: '9450134914',
        gender: 'Male',
        panCard: 'ABCDE1234F',
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
