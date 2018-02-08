

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50],
      },
    },
    password_digest: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    // password_confirmation: {
    //   type: Sequelize.VIRTUAL,

    // },
    user_email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
        len: [1, 255],
      },
    },
    user_dob: {
      type: Sequelize.DATEONLY,
      validate: {
        notEmpty: true,
      },

    },
    user_gender: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },

    },
    user_pan: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    user_pic: {
      type: Sequelize.STRING,
    },
    user_fathername: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('users'),
};
