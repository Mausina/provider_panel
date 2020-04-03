'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('customers', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      telephone:'+380630674453',
      password:'12345',
      salt:'123',
      prefix:"JH",
      status:'1',
      role:'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customers', null, {});
  }
};
