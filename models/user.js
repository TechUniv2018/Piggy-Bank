module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
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
    // password_confirmation: {
    //   type: DataTypes.VIRTUAL,
    // },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
        len: [1, 255],
      },
    },
    user_dob: {
      type: DataTypes.DATEONLY,
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
  return user;
};
