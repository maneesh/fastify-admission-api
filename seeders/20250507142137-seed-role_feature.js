"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "role_feature",
      [
        {
          role_id: 5,
          feature_id: 1,
          created_by: "utkarsh",
          updated_by: "utkarsh",
          created_at: new Date(),
          updated_at: new Date(),
        },
        
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("role_feature", null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};
