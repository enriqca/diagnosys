"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("especialidade", [
      {descricao: "Acupuntura", createdAt: new Date(), updatedAt: new Date()},
      {
        descricao: "Alergia e imunologia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Anestesiologia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {descricao: "Angiologia", createdAt: new Date(), updatedAt: new Date()},
      {descricao: "Cardiologia", createdAt: new Date(), updatedAt: new Date()},
      {
        descricao: "Cirurgia cardiovascular",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Cirurgia da mão",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Cirurgia de cabeça e pescoço",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Cirurgia do aparelho digestivo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Cirurgia geral",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Cirurgia oncológica",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Cirurgia pediátrica",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Cirurgia plástica",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Cirurgia torácica",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Cirurgia vascular",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Clínica médica",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Coloproctologia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {descricao: "Dermatologia", createdAt: new Date(), updatedAt: new Date()},
      {
        descricao: "Endocrinologia e metabologia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {descricao: "Endoscopia", createdAt: new Date(), updatedAt: new Date()},
      {
        descricao: "Gastroenterologia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Genética médica",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {descricao: "Geriatria", createdAt: new Date(), updatedAt: new Date()},
      {
        descricao: "Ginecologia e obstetrícia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Hematologia e hemoterapia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {descricao: "Homeopatia", createdAt: new Date(), updatedAt: new Date()},
      {descricao: "Infectologia", createdAt: new Date(), updatedAt: new Date()},
      {descricao: "Mastologia", createdAt: new Date(), updatedAt: new Date()},
      {
        descricao: "Medicina de emergência",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Medicina de família e comunidade",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Medicina do trabalho",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Medicina de tráfego",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Medicina esportiva",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Medicina física e reabilitação",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Medicina intensiva",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Medicina legal e perícia médica",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Medicina nuclear",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Medicina preventiva e social",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {descricao: "Nefrologia", createdAt: new Date(), updatedAt: new Date()},
      {
        descricao: "Neurocirurgia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {descricao: "Neurologia", createdAt: new Date(), updatedAt: new Date()},
      {descricao: "Nutrologia", createdAt: new Date(), updatedAt: new Date()},
      {descricao: "Oftalmologia", createdAt: new Date(), updatedAt: new Date()},
      {
        descricao: "Oncologia clínica",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Ortopedia e traumatologia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Otorrinolaringologia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {descricao: "Patologia", createdAt: new Date(), updatedAt: new Date()},
      {
        descricao: "Patologia clínica/medicina laboratorial",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {descricao: "Pediatria", createdAt: new Date(), updatedAt: new Date()},
      {descricao: "Pneumologia", createdAt: new Date(), updatedAt: new Date()},
      {descricao: "Psiquiatria", createdAt: new Date(), updatedAt: new Date()},
      {
        descricao: "Radiologia e diagnóstico por imagem",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {descricao: "Radioterapia", createdAt: new Date(), updatedAt: new Date()},
      {descricao: "Reumatologia", createdAt: new Date(), updatedAt: new Date()},
      {descricao: "Urologia", createdAt: new Date(), updatedAt: new Date()},
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("especialidade", null, {});
  },
};
