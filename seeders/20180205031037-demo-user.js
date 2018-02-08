module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      user_name: 'John',
      password_digest: '$2a$04$DR4DlDs5x76CzgYHpRSV4Oe8tT6TDSnLcInTZNd8ryzfSoZYFlJJa', // codechefD12$
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
      password_digest: '$2a$04$ur8D2DFJaJcaoXA7QwsYvuM9NtbccuLwjX9cyS8YpgkCTPcADt7WG', // leetcodeP23*
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
