'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('course_types', [{
      name: 'Under Graduate',
      short_name: 'UG',
      created_by: 'utkarsh',
      updated_by: 'utkarsh',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('course_types', null, {
      truncate: true,
      restartIdentity: true
    });
  }
};
