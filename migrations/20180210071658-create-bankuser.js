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
      unique: true,
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
    //  allowNull: false,
      defaultValue: null,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      // allowNull: false,
      defaultValue: null,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    fatherName: {
    //  allowNull: false,
      defaultValue: null,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      // allowNull: false,
      defaultValue: null,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    dob: {
      // allowNull: false,
      defaultValue: null,
      type: Sequelize.DATE,
      validate: {
        notEmpty: true,
      },
    },
    phoneNumber: {
      // allowNull: false,
      defaultValue: null,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
        len: 10,
      },
    },
    gender: {
      // allowNull: false,
      defaultValue: null,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    panCardNumber: {
      // allowNull: false,
      defaultValue: null,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
        len: 10,
      },
    },
    user_pic: {
      // allowNull: true,
      defaultValue: null,
      type: Sequelize.STRING,
    },
    address: {
      // allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    aadharNumber: {
    //  allowNull: false,
      type: Sequelize.STRING,
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
  down: queryInterface => queryInterface.dropTable('bankusers'),
};
