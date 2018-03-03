const Models = require('../../models');

module.exports = userId =>
  Models.accounts.findAll({
    where: { userId },
  });

