module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_tokens', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    aadhaar_id: {
      type: Sequelize.STRING,
      unique: true,
    },
    token: {
      type: Sequelize.STRING,
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
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
  down: queryInterface => queryInterface.dropTable('user_tokens'),
};
