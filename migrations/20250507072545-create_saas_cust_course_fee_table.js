'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('saas_cust_course_fee', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      saas_cust_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'saas_cust',
          key: 'id'
        }
      },
      fee_type: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: null
      },
      categery: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      updated_by: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
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
    await queryInterface.dropTable('saas_cust_course_fee');
  }
};
