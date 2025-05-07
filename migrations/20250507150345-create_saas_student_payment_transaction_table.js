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
        allowNull: false
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
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
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
