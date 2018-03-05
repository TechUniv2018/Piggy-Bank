getCurrentBalance(userId).then((resp) => {
  let balance = 0;
  balance = JSON.parse(JSON.stringify(resp))[0].currentBalance;
  if (amount <= balance) {
    Models.accounts.update({
      currentBalance: +balance - +amount,
    }, { where: { userId } }).then(() => {
      getCurrentBalance(touserId).then((resp1) => {
        balance = 0;
        console.log(resp1);
        balance = JSON.parse(JSON.stringify(resp1))[0].currentBalance;
        if (amount <= 2147483647 - balance) {
          Models.accounts.update({
            currentBalance: +balance + +amount,
          }, { where: { userId: touserId } }).then(() => {
            enterTransaction(userId, touserId, amount, 'complete', 'transfer');
          });
        }
      }).then(() => {
      });
    });
  }
});
