'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('saas_cust_course', [{
      saas_cust_id: 1,
      course_id: 1,
      course_display: "B.Sc. Comp Sci",
      year_sem_type: "Year",
      created_by: "utkarsh",
      updated_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }, {
      saas_cust_id: 2,
      course_id: 2,
      course_display: "M.Sc. Maths",
      year_sem_type: "Semester",
      created_by: "utkarsh",
      updated_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }, {
      saas_cust_id: 1,
      course_id: 3,
      course_display: "B.A. English",
      year_sem_type: null,
      created_by: "utkarsh",
      updated_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('saas_cust_course', null, {
      truncate: true,
      restartIdentity: true
    });
  }
};
