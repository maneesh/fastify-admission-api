"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "saas_cust_user",
      [
        {
          user_id: 1,
          saas_cust_id: 1,
          created_by: "utkarsh",
          updated_by: "utkarsh",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          saas_cust_id: 1,
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
    await queryInterface.bulkDelete("saas_cust_user", null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};
