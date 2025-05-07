'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('session', [
      {
        academic_year: '2025-2026',
        admission_type: 'admission',
        start: 'July',
        end: 'June',
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        academic_year: '2026-2027',
        admission_type: 'post_admission',
        start: 'August',
        end: 'July',
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        academic_year: '2027-2028',
        admission_type: 'admission',
        start: 'September',
        end: 'August',
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('session', null, {});
  }
};
