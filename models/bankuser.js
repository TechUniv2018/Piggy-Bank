

module.exports = (sequelize, DataTypes) => {
  const bankuser = sequelize.define('bankusers', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50],
      },
    },
    userId: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
    },
    name: {
      // allowNull: false,
      defaultValue: null,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    gender: {
      // allowNull: false,
      defaultValue: null,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    dob: {
      // allowNull: false,
      defaultValue: null,
      type: DataTypes.DATE,
      validate: {
        notEmpty: true,
      },
    },
    contact: {
      // allowNull: false,
      defaultValue: null,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    address: {
    //  allowNull: false,
      defaultValue: null,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    aadharNumber: {
      // allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },

  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      },
    },
  });
  return bankuser;
};
