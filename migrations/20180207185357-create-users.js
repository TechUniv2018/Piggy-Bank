module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_name: {
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50],
      },
      type: Sequelize.STRING,
    },
    password_digest: {
      validate: {
        notEmpty: true,
      },
      type: Sequelize.STRING,
    },
    user_firstname: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    user_lastname: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    user_address: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    user_phone: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
        len: 10,
      },
    },
    user_email: {
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255],
      },
      type: Sequelize.STRING,
    },
    user_dob: {
      validate: {
        notEmpty: true,
      },
      type: Sequelize.DATE,
    },
    user_gender: {
      validate: {
        notEmpty: true,
      },
      type: Sequelize.STRING,
    },
    user_pan: {
      validate: {
        notEmpty: true,
      },
      type: Sequelize.STRING,
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
