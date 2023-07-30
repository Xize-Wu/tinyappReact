'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('urls', [{
      long_url: 'www.google.com',
      short_url: 'ejd87a',
      user_id: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      long_url: 'www.facebook.com',
      short_url: '8esk1v',
      user_id: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }],);

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('urls', null, {});
  }
};
