'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('saas_student_payment_transaction', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      register_student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'saas_student_register',
          key: 'id'
        }
      },
      start_date_time: {
        type: Sequelize.DATE
      },
      gateway_transaction_id: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2)
      },
      fee_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'saas_cust_course_fee',
          key: 'id'
        }
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      created_by: {
        type: Sequelize.STRING
      },
      updated_by: {
        type: Sequelize.STRING
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('saas_student_payment_transaction');
  }
};
