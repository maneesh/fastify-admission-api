'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('session', [{
      academic_year: "2024-2025",
      admission_type: "admission",
      start: "August 1, 2024",
      end: "June 30, 2025",
      created_by: "utkarsh",
      updated_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }, {
      academic_year: "2025-2026",
      admission_type: "post_admission",
      start: "July 1, 2025",
      end: "May 31, 2026",
      created_by: "utkarsh",
      updated_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }, {
      academic_year: "2023-2024",
      admission_type: "admission",
      start: "September 1, 2023",
      end: "July 31, 2024",
      created_by: "utkarsh",
      updated_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('session', null, {
      truncate: true,
      restartIdentity: true
    });
  }
};
