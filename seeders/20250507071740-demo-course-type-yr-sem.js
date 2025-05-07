'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('course_type_yr_sem', [{
      yr_sem_type: "Year",
      yr_sem: "1",
      display_name: "Year 1",
      created_by: "utkarsh",
      updated_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }, {
      yr_sem_type: "Semester",
      yr_sem: "1",
      display_name: "Sem 1",
      created_by: "utkarsh",
      updated_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }, {
      yr_sem_type: "Year",
      yr_sem: "2",
      display_name: "Year 2",
      created_by: "utkarsh",
      updated_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('course_type_yr_sem', null, {
      truncate: true,
      restartIdentity: true
    });
  }
};
