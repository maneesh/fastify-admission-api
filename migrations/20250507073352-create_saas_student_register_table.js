'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('saas_student_register', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cust_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'saas_cust',
          key: 'id'
        }
      },
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id'
        }
      },
      year_sem_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
         references: {
          model: 'course_type_yr_sem',
          key: 'id'
        }
      },
      register_session: {
        type: Sequelize.INTEGER,
        allowNull: false,
         references: {
          model: 'session',
          key: 'id'
        }
      },
      full_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      date_of_birth: {
        type: Sequelize.DATE
      },
      father_name: {
        type: Sequelize.STRING
      },
      mother_name: {
        type: Sequelize.STRING
      },
      registration_num: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('saas_student_register');
  }
};
