'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('saas_cust', [{
      name: 'Buddha PG College',
      created_by: 'utkarsh',
      updated_by: 'utkarsh',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'St. Andrews PG College',
      created_by: 'utkarsh',
      updated_by: 'utkarsh',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('saas_cust', null, {
      truncate: true,
      restartIdentity: true
    });
  }
};
