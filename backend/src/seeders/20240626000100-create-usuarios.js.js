"use strict";

const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT_ROUNDS || 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const adminSenha = await bcrypt.hash("admin", saltRounds);
    const medicoSenha = await bcrypt.hash("medico", saltRounds);

    await queryInterface.bulkInsert("usuario", [
      {
        login: "admin",
        senha: "admin",
        idPessoa: 1, // Assumindo que o idPessoa 1 já existe e está associado a uma Pessoa
        tipo: "A",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        login: "medico",
        senha: "medico",
        idPessoa: 2, // Assumindo que o idPessoa 2 já existe e está associado a uma Pessoa
        tipo: "M",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("usuario", null, {});
  }
};
