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
    },
    userId: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
      unique: true,
    },
    password: {
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      type: Sequelize.STRING,
    },
    name: {
    //  allowNull: false,
      defaultValue: null,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
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

    dob: {
      // allowNull: false,
      defaultValue: null,
      type: Sequelize.DATE,
      validate: {
        notEmpty: true,
      },
    },
    contact: {
      // allowNull: false,
      defaultValue: null,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
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
    guardian: {
    //  allowNull: false,
      defaultValue: null,
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
