const Models = require('../../models');

module.exports = (fromuserId, touserId, amount, status, type) =>

  Models.transactions.create({
    transactionId: `${fromuserId}_${touserId}_D_${new Date()}`,
    transactionStatus: status,
    toAccount: fromuserId,
    fromAccount: touserId,
    transactionType: type,
    transactionTimestamp: new Date(),
    amount,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
