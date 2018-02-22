

module.exports = (sequelize, DataTypes) => {
  const accounts = sequelize.define('accounts', {
    accountNumber: DataTypes.STRING,
    currentBalance: DataTypes.INTEGER,
    accountType: DataTypes.STRING,
    dateClosed: DataTypes.DATE,
    userName: DataTypes.STRING,
  }, {
  });
  return accounts;
};
