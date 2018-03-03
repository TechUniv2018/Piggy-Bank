const Models = require('../../models');

module.exports = (userId, amount, status, type) =>

  Models.transactions.create({
    transactionId: `${userId}_${userId}_D_${new Date()}`,
    transactionStatus: status,
    toAccount: userId,
    fromAccount: userId,
    transactionType: type,
    transactionTimestamp: new Date(),
    amount,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
