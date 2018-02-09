module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      user_name: 'John',
      password_digest: '$2a$10$ozeZZxOXWGSNw/OQUKG3sev5PdsydBPPa7R/RO9xyMyNg7eMOA2Ze', // codechefD12$
      user_firstname: 'John',
      user_lastname: 'Doe',
      user_address: 'House Number 102,Polo Colony,Australia-20322',
      user_phone: 8475375640,
      user_email: 'johndoe12@gmail.com',
      user_dob: new Date(1994, 3, 6),
      user_gender: 'Male',
      user_pan: 'ABCDE1234F',
      user_pic: '',
      user_fathername: 'Kris Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_name: 'Suzan_best',
      password_digest: '$2a$10$/j7jKBZGeP07YlYMmLPDSe5DzvCYu2xO5uRfhuByTb1SqfBeF/2Im', // leetcodeP23*
      user_firstname: 'Suzan',
      user_lastname: 'Lopez',
      user_address: 'House Number 104,British Colony,Australia-20322',
      user_phone: 8475372330,
      user_email: 'suzanlopez23@gmail.com',
      user_dob: new Date(1993, 2, 1),
      user_gender: 'Female',
      user_pan: 'EFGHI5678P',
      user_pic: '',
      user_fathername: 'Sam Lopez',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },
  down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('users', [{
      userId: 'John123',
    }]);
  },
};
