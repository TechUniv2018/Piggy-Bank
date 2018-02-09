module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50],
      },
    },
    password_digest: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    user_firstname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    user_lastname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    user_address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    user_phone: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: 10,
      },
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255],
      },
    },
    user_dob: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true,
      },
    },
    user_gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    user_pan: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    user_pic: {
      type: DataTypes.STRING,
    },
    user_fathername: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return users;
};
