

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    phone_number: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
      defaultValue: null,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    aadhar: {
      type: Sequelize.STRING,
      defaultValue: null,
      validate: {
        notEmpty: true,
      },
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      defaultValue: null,
      validate: {
        notEmpty: true,
        isEmail: true,
        len: [1, 255],
      },
    },
    kyc: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    account_id: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
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
  down: queryInterface => queryInterface.dropTable('users'),
};
