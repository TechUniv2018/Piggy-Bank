'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_authentication = sequelize.define('user_authentication', {
    userid: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_authentication;
};