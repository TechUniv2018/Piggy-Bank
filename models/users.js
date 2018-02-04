module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    userId: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  return users;
};
