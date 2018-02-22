const Models = require('../../../models');

const cleanUpAllTables = () => [Models.bankusers.destroy({ cascade: true, truncate: true }),
  Models.transactions.destroy({ cascade: true, truncate: true })];

describe('test transaction table', () => {
  test('test transactions table is created', (done) => {
    Models.bankusers.findAll().then((result) => {
      expect(result).toEqual([]);
      done();
    });
  });

  test('insert transaction into transaction table should be successful', (done) => {
    const userObject = {
      userName: 'pari',
      password: '$2a$10$uBqWq2mNznlnCisaC.i3UOahjcC9I4CYWy3gGr2w5/oCGCVur0wOm', // wearebest2D%
      firstName: 'Paridhi',
      lastName: 'Mohindra',
      phoneNumber: 9481867815,
      email: 'pari815@gmail.com',
      dob: new Date(1996, 10, 26),
      gender: 'Female',
      panCardNumber: 'ABCDE1234F',
      user_pic: '',
      fatherName: 'R.K.Mohindra',
      address: 'where is the house',
      aadharNumber: '123412341234',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    Models.bankusers.create(userObject).then((resultUser) => {
      const userResultObject = {
        userName: resultUser.dataValues.userName,
        password: resultUser.dataValues.password,
        firstName: resultUser.dataValues.firstName,
        lastName: resultUser.dataValues.lastName,
        phoneNumber: resultUser.dataValues.phoneNumber,
        email: resultUser.dataValues.email,
        gender: resultUser.dataValues.gender,
        panCardNumber: resultUser.dataValues.panCardNumber,
        user_pic: resultUser.dataValues.user_pic,
        fatherName: resultUser.dataValues.fatherName,
        address: resultUser.dataValues.address,
        aadharNumber: resultUser.dataValues.aadharNumber,
        createdAt: resultUser.dataValues.createdAt,
        updatedAt: resultUser.dataValues.updatedAt,
      };

      expect(userResultObject).toEqual(userObject);
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

