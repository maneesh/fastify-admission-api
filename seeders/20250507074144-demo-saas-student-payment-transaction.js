'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('saas_student_payment_transaction', [{
      register_student_id: 1,
      start_date_time: "2025-05-07 10:00:00",
      gateway_transaction_id: "TXN123",
      status: "Success",
      amount: 500.00,
      fee_id: 1,
      created_by: "utkarsh",
      updated_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }, {
      register_student_id: 2,
      start_date_time: "2025-05-07 11:00:00",
      gateway_transaction_id: "TXN456",
      status: "Pending",
      amount: 1000.00,
      fee_id: 2,
      created_by: "utkarsh",
      updated_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }, {
      register_student_id: 3,
      start_date_time: "2025-05-07 12:00:00",
      gateway_transaction_id: "TXN789",
      status: "Failed",
      amount: 5000.00,
      fee_id: 3,
      created_by: "utkarsh",
      updated_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('saas_student_payment_transaction', null, {
      truncate: true,
      restartIdentity: true
    });
  }
};
