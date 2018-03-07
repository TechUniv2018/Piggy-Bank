module.exports = (sequelize, DataTypes) => {
  const userToken = sequelize.define('user_token', {
    aadhaar_id: {
      type: DataTypes.STRING,
      unique: true,
    },
    token: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      },
    },
  });
  return userToken;
};
