'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('saas_cust_course', [
      {
        saas_cust_id: 1,
        course_id: 1,
        course_display: 'B.Sc. Maths',
        year_sem_type: 'Year',
        reg_enabled: true,
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        saas_cust_id: 2,
        course_id: 2,
        course_display: 'M.Sc. Physics',
        year_sem_type: 'Semester',
        reg_enabled: false,
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        saas_cust_id: 1,
        course_id: 3,
        course_display: 'B.A. English',
        year_sem_type: 'Year',
        reg_enabled: true,
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('saas_cust_course', null, {});
  }
};
