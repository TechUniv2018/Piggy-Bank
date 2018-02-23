

module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define('transactions', {
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    transactionStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    transactionTimestamp: {
<<<<<<< HEAD
      type: DataTypes.DATE,
=======
      type: DataTypes.TIME,
>>>>>>> 9179b6b6c1f16e9b45329a17eeb1965c228b7e53
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    fromAccount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    toAccount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    transactionType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    // classMethods: {
    //   associate(models) {
    //     // associations can be defined here
    //   },
    // },
  });
  return transactions;
};
