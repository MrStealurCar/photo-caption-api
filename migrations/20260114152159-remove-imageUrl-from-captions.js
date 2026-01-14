"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Captions", "imageUrl");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Captions", "imageUrl", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
