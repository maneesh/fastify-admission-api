'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cust_details', [{
      cust_id: 1,
      domain: 'buddhpgcollege.com',
      api_key: '12345',
      active_session: 2025,
      created_by: 'utkarsh',
      updated_by: 'utkarsh',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      cust_id: 2,
      domain: 'standrewscollege.com',
      api_key: '12345',
      active_session: 2025,
      created_by: 'utkarsh',
      updated_by: 'utkarsh',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cust_details', null, {
      truncate: true,
      restartIdentity: true
    });
  }
};
