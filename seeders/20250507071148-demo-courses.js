'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('courses', [{
      course_type: 1,
      course_name: 'BA',
      years: 3,
      semesters: 6,
      created_by: 'utkarsh',
      updated_by: 'utkarsh',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      course_type: 1,
      course_name: 'B.tech',
      years: 4,
      semesters: 8,
      created_by: 'utkarsh',
      updated_by: 'utkarsh',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      course_type: 1,
      course_name: 'BCA',
      years: 3,
      semesters: 6,
      created_by: 'utkarsh',
      updated_by: 'utkarsh',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('courses', null, {
      truncate: true,
      restartIdentity: true
    });
  }
};
