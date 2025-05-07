'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('courses', [
      {
        course_type: 1,
        course_name: 'B.Sc. Maths',
        years: 3,
        semesters: 6,
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        course_type: 2,
        course_name: 'M.Sc. Physics',
        years: 2,
        semesters: 4,
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        course_type: 1,
        course_name: 'B.A. English',
        years: 3,
        semesters: 6,
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('courses', null, {});
  }
};
