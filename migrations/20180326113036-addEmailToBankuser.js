module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'users',
      'email',
      Sequelize.STRING,
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'bankusers',
      'email',
      Sequelize.STRING,
    );
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
