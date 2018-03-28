module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'bankusers',
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
  },
};
