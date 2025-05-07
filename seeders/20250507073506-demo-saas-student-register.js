'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('saas_student_register', [{
      cust_id: 1,
      course_id: 1,
      year_sem_id: 1,
      register_session: 1,
      full_name: "Aishwarya Sharma",
      email: "aishwarya.sharma@example.com",
      mobile: "91-9876543210",
      date_of_birth: "2000-05-10",
      father_name: "Rajesh Sharma",
      mother_name: "Priya Sharma",
      registration_num: "AS123",
      created_by: "utkarsh",
      updated_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }, {
      cust_id: 1,
      course_id: 2,
      year_sem_id: 2,
      register_session: 2,
      full_name: "Vikram Singh",
      email: "vikram.singh@example.com",
      mobile: "91-8765432109",
      date_of_birth: "2001-12-15",
      father_name: "Arjun Singh",
      mother_name: "Deepika Singh",
      registration_num: "VS456",
      created_by: "utkarsh",
      updated_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }, {
      cust_id: 1,
      course_id: 3,
      year_sem_id: 3,
      register_session: 3,
      full_name: "Sneha Patel",
      email: "sneha.patel@example.com",
      mobile: "91-7654321098",
      date_of_birth: "2002-08-22",
      father_name: "Amit Patel",
      mother_name: "Neha Patel",
      registration_num: "SP789",
      created_by: "utkarsh",
      updated_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('saas_student_register', null, {
      truncate: true,
      restartIdentity: true
    });
  }
};
