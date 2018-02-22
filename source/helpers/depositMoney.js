const getCurrentBalance = require('./getCurrentBalance');
const Models = require('../../models');

module.exports = (accountNumber, amount) =>
  getCurrentBalance(accountNumber).then((resp) => {
    let balance = null;
    if (resp !== null && resp !== 'undefined' && 'currentBalance' in resp[0]) {
      console.log('Hello');
      balance = JSON.parse(JSON.stringify(resp))[0].currentBalance;
    }
    if (balance === null || balance === undefined) {
      return ({
        data: 'Enter valid account Number',
        statusCode: 400,
      });
    }
    Models.accounts.update({
      currentBalance: +balance + +amount,
    }, { where: { accountNumber } }).then(() => ({ message: '{balance} is added to account number ', status_code: 200 }))
      .catch(error => ({
        data: `Error in depositing data => ${error}`,
        statusCode: 500,
      }));
  }).catch(error => ({
    data: `Error in getting current balance => ${error}`,
    statusCode: 500,
  }));
