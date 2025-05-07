 'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('saas_student_register', [
      {
        cust_id: 1,
        course_id: 1,
        year_sem_id: 1,
        register_session: 1,
        full_name: 'Aryan Sharma',
        email: 'aryan.sharma@example.com',
        mobile: '1234567890',
        date_of_birth: '2000-01-01',
        father_name: 'Mr. Sharma',
        mother_name: 'Mrs. Sharma',
        registration_num: 'REG123',
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cust_id: 2,
        course_id: 2,
        year_sem_id: 2,
        register_session: 2,
        full_name: 'Priya Verma',
        email: 'priya.verma@example.com',
        mobile: '9876543210',
        date_of_birth: '2001-02-02',
        father_name: 'Mr. Verma',
        mother_name: 'Mrs. Verma',
        registration_num: 'REG456',
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cust_id: 1,
        course_id: 3,
        year_sem_id: 3,
        register_session: 3,
        full_name: ' Rohan Kapoor',
        email: 'rohan.kapoor@example.com',
        mobile: '5551234567',
        date_of_birth: '2002-03-03',
        father_name: 'Mr. Kapoor',
        mother_name: 'Mrs. Kapoor',
        registration_num: 'REG789',
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('saas_student_register', null, {});
  }
};
