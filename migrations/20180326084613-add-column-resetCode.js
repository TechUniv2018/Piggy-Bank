

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('bankusers', 'resetCode', {
      type: Sequelize.STRING,
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('bankusers', 'resetCode');
  },
};

