
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_authentications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userid: {
      unique: true,
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    token: {
      type: Sequelize.STRING,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('user_authentications'),
};
