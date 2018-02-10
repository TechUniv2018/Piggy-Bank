

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('bankusers', [{
    userName: 'John_1234',
    password: '$2a$10$ozeZZxOXWGSNw/OQUKG3sev5PdsydBPPa7R/RO9xyMyNg7eMOA2Ze', // codechefD12$
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: 8475375640,
    email: 'johndoe12@gmail.com',
    dob: new Date(1994, 3, 6),
    gender: 'Male',
    panCardNumber: 'ABCDE1234F',
    user_pic: '',
    fatherName: 'Kris Doe',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userName: 'Suzan_best',
    password: '$2a$10$/j7jKBZGeP07YlYMmLPDSe5DzvCYu2xO5uRfhuByTb1SqfBeF/2Im', // leetcodeP23*
    firstName: 'Suzan',
    lastName: 'Lopez',
    phoneNumber: 8475372330,
    email: 'suzanlopez23@gmail.com',
    dob: new Date(1993, 2, 1),
    gender: 'Female',
    panCardNumber: 'EFGHI5678P',
    user_pic: '',
    fatherName: 'Sam Lopez',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {}),

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('bankusers', [{
      userName: 'John1234',
    }]);
  },
};
