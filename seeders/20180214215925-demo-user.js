

module.exports = {
  up: (queryInterface, Sequelize) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
    queryInterface.bulkInsert('user_authenticates', [{
      userid: 'anmol5varma',
      password: 'wearethebest2D%',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userid: 'anmolvarma',
      password: 'Scooby!23',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {}),

  down: (queryInterface, Sequelize) =>
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
    queryInterface.bulkDelete('Person', null, {}),

};
