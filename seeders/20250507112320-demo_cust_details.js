'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cust_details', [
      {
        cust_id: 1,
        domain: 'buddhpg.com',
        api_key: '12345',
        active_session: 1,
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cust_id: 2,
        domain: 'standrews.com',
        api_key: '12345',
        active_session: 1,
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cust_details', null, {});
  }
};
