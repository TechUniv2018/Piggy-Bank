

module.exports = (sequelize, DataTypes) => {
  let Users = sequelize.define('Users', {
    userId: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return Users;
};
