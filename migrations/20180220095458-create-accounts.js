

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('accounts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      allowNull: false,
      type: Sequelize.STRING,
      references: { model: 'bankusers', key: 'userId' },
    },
    currentBalance: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    accountType: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    dateClosed: {
      type: Sequelize.DATE,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('accounts'),
};
