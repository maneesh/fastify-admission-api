'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('saas_cust_course_fee', [
      {
        saas_cust_id: 1,
        fee_type: 'Registration',
        amount: 500.00,
        categery: 'General',
        updated_by: 'Utkarsh',
        created_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        saas_cust_id: 2,
        fee_type: 'Admission',
        amount: 1000.00,
        categery: 'General',
        updated_by: 'Utkarsh',
        created_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        saas_cust_id: 1,
        fee_type: 'Tuition',
        amount: 2000.00,
        categery: 'OBC',
        updated_by: 'Utkarsh',
        created_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('saas_cust_course_fee', null, {});
  }
};
