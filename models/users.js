

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    phone_number: {
      Type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      defaultValue: null,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      Type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    user_name: {
      Type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    aadhar: {
      Type: DataTypes.STRING,
      defaultValue: null,
      validate: {
        notEmpty: true,
      },
      unique: true,
    },
    email: {
      Type: DataTypes.STRING,
      defaultValue: null,
      validate: {
        notEmpty: true,
        isEmail: true,
        len: [1, 255],
      },

    },
    kyc: {
      Type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    accout_id: {
      Type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  }, {
  });
  return users;
};
