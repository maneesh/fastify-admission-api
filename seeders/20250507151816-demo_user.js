'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', [
      {
        fullname: 'Maneesh Kumar',
        email: 'maneesh.kumar@example.com',
        password: 'hashed_password',
        mobile: '1234567890',
        role_id: 1,
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        fullname: 'SM_ADM',
        email: 'sm_adm@example.com',
        password: 'hashed_password',
        mobile: '9876543210',
        role_id: 1,
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        fullname: 'Utkarsh',
        email: 'utkarsh@example.com',
        password: 'hashed_password',
        mobile: '5551234567',
        role_id: 1,
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};
