

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
    firstName: {
      // allowNull: false,
      defaultValue: null,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      // allowNull: false,
      defaultValue: null,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    fatherName: {
      // allowNull: false,
      defaultValue: null,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      // allowNull: false,
      defaultValue: null,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isEmail: true,
        len: [1, 255],
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
    phoneNumber: {
      defaultValue: null,
      // allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: 10,
      },
    },
    gender: {
      defaultValue: null,
      //  allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    panCardNumber: {
      defaultValue: null,
      // allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    user_pic: {
      type: DataTypes.STRING,
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
