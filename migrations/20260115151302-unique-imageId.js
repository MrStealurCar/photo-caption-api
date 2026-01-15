"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Captions", {
      fields: ["imageId"],
      type: "unique",
      name: "unique_imageId_constraint",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Captions",
      "unique_imageId_constraint"
    );
  },
};
