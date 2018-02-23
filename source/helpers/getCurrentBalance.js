const Models = require('../../models');

module.exports = accountNumber =>
  Models.accounts.findAll({
    where: { accountNumber },
  });

