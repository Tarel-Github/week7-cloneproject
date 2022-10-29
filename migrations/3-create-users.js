'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      locationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Locations',
          key:'locationId'
        }
      },
      nickname: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
      },
      password:  {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email:{
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
      },
      profileImage:{
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      createdAt: Sequelize.STRING(40),
      updatedAt: Sequelize.STRING(40)

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};