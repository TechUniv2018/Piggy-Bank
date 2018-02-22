

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('bankusers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userName: {
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50],
      },
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      type: Sequelize.STRING,
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    fatherName: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    dob: {
      allowNull: false,
      type: Sequelize.DATE,
      validate: {
        notEmpty: true,
      },
    },
    phoneNumber: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
        len: 10,
      },
    },
    gender: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    panCardNumber: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
        len: 10,
      },
    },
    user_pic: {
      allowNull: false,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('bankusers'),
};
