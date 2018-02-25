

module.exports = (sequelize, DataTypes) => {
  const user_authentication = sequelize.define('user_authentication', {
    userid: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return user_authentication;
};
