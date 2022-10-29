'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications', {
     
    notiId:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId'
      }
    },
    message: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    isRead: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    type:{
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    referenceId:{
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.STRING,
      allowNull: false,
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notifications');
  }
};