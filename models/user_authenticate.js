
module.exports = (sequelize, DataTypes) => {
  const userAuthenticate = sequelize.define('user_authenticates', {
    userid: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
  }, {
    classMethods: {
      // associate(models) {
      //   // associations can be defined here
      // },
    },
  });
  return userAuthenticate;
};
