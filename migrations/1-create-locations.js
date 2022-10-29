'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Locations', {
      
    locationId:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    locationName:{
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Locations');
  }
};