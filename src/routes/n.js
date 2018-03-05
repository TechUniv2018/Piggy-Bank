return sequelize.transaction(function (t) {

  // chain all your queries here. make sure you return them.
  return User.create({
    firstName: 'Abraham',
    lastName: 'Lincoln'
  }, {transaction: t}).then(function (user) {
    return user.setShooter({
      firstName: 'John',
      lastName: 'Boothe'
    }, {transaction: t});
  });

}).then(function (result) {
  // Transaction has been committed
  // result is whatever the result of the promise chain returned to the transaction callback
}).catch(function (err) {
  // Transaction has been rolled back
  // err is whatever rejected the promise chain returned to the transaction callback
});