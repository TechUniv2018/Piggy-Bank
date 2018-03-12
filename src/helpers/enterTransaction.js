const Models = require('../../models');

module.exports = (fromuserId, touserId, fromRemainingBalance, toRemainigBalance, amount, status, type) =>

  Models.transactions.create({
    transactionId: `${fromuserId}_${touserId}_D_${new Date()}`,
    transactionStatus: status,
    toAccount: touserId,
    fromAccount: fromuserId,
    toRemainigBalance,
    fromRemainingBalance,
    transactionType: type,
    transactionTimestamp: new Date(),
    amount,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
