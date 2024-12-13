"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("pessoa", [
      {
        id: 1,
        nome: "admin",
        email: "admin@example.com",
        cpf: "12345678901",
        rg: "1234567",
        telefone: "123456789",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nome: "medico",
        email: "medico@example.com",
        cpf: "98765432100",
        rg: "7654321",
        telefone: "987654321",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pessoa", null, {});
  }
};
