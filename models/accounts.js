

module.exports = (sequelize, DataTypes) => {
  const accounts = sequelize.define('accounts', {
    userId: DataTypes.STRING,
    currentBalance: DataTypes.INTEGER,
    accountType: DataTypes.STRING,
    dateClosed: DataTypes.DATE,
  }, {
  });
  return accounts;
};
