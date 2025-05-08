'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', [{
      full_name: "Aradhya",
      email:"aradhya123@gmail.com",
      password: '$2a$10$7UHjQC7Kz17OKu/ILY3nF.fjI5Pdgrf.Z0E0P1IgAb/Wn4Q.IUXo2',//Ravi@555
      mobile: '9987654321',
      role_id:5,
      created_by: "utkarsh",
      updated_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }, {
      full_name: "Utkarsh",
      email:"utkarsh123@gmail.com",
      password: '$2a$10$7UHjQC7Kz17OKu/ILY3nF.fjI5Pdgrf.Z0E0P1IgAb/Wn4Q.IUXo2',//Ravi@555
      mobile: '9987654371',
      role_id:5,
      created_by: "utkarsh",
      updated_by: "utkarsh",
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {
      truncate: true,
      restartIdentity: true
    });
  }
};
