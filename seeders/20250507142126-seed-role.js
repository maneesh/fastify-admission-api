"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "role",
      [
        {
          name: "SUPER ADMIN",
          app_type_id: 2,
          created_by: "utkarsh",
          updated_by: "utkarsh",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "ADMIN",
          app_type_id: 2,
          created_by: "utkarsh",
          updated_by: "utkarsh",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "GROUP ADMIN",
          app_type_id: 2,
          created_by: "utkarsh",
          updated_by: "utkarsh",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "ADMIN",
          app_type_id: 1,
          created_by: "utkarsh",
          updated_by: "utkarsh",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "ADMISSION ADMIN",
          app_type_id: 1,
          created_by: "utkarsh",
          updated_by: "utkarsh",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "ADMISSION OPR",
          app_type_id: 1,
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
    await queryInterface.bulkDelete("role", null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};
