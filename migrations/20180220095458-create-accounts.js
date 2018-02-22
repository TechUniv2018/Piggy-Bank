

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('accounts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    accountNumber: {
      allowNull: false,
      type: Sequelize.STRING,
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
    userName: {
      type: Sequelize.STRING,
      unique: true,
      references: { model: 'bankusers', key: 'userName' },
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
