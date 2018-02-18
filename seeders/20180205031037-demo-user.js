
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      userId: 'hello123',
      password: 'poiuytuerf',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Users', [{
      userId: 'John123',
    }]);
  },
};
