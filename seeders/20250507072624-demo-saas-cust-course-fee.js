'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('saas_cust_course_fee', [{
      saas_cust_id: 1,
      fee_type: "Registration Fee",
      amount: 500.00,
      categery: "General",
      updated_by: "utkarsh",
      created_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }, {
      saas_cust_id: 2,
      fee_type: "Admission Fee",
      amount: 1000.00,
      categery: "General",
      updated_by: "utkarsh",
      created_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }, {
      saas_cust_id: 1,
      fee_type: "Tuition Fee",
      amount: 5000.00,
      categery: "B.Sc. Comp Sci",
      updated_by: "utkarsh",
      created_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('saas_cust_course_fee', null, {
      truncate: true,
      restartIdentity: true
    });
  }
};
