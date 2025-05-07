'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('saas_student_payment_transaction', [
      {
        register_student_id: 1,
        start_date_time: '2025-07-08 10:00:00',
        gateway_transaction_id: 'TXN123',
        status: 'Success',
        amount: 500.00,
        fee_id: 1,
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        register_student_id: 2,
        start_date_time: '2025-07-09 11:00:00',
        gateway_transaction_id: 'TXN456',
        status: 'Pending',
        amount: 1000.00,
        fee_id: 2,
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        register_student_id: 3,
        start_date_time: '2025-07-10 12:00:00',
        gateway_transaction_id: 'TXN789',
        status: 'Failed',
        amount: 2000.00,
        fee_id: 3,
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('saas_student_payment_transaction', null, {});
  }
};
