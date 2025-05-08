'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('feature', [{
      name: "Manage Admission",
      url:"/manage-admission",
      app_type: 'B2B',
      created_by: "utkarsh",
      updated_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }, ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('feature', null, {
      truncate: true,
      restartIdentity: true
    });
  }
};
