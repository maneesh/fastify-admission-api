'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('role_feature', [
      {
        role_id: 1,
        feature_id: 1,
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role_id: 2,
        feature_id: 2,
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role_id: 3,
        feature_id: 3,
        created_by: 'Utkarsh',
        updated_by: 'Utkarsh',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role_feature', null, {});
  }
};
