module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      userId : 'John123',
      password : 'Doe123',
      createdAt : new Date(),
      updatedAt : new Date(),
    },
   { 
     userId : 'Surabhi123',
    password : 'Gupta*()',
    createdAt : new Date(),
    updatedAt : new Date(),
  }
  ],{});
  },

  down : function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('users', [{
     userId:'John123'
    }])
  }
};