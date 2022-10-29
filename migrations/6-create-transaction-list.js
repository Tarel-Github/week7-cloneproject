'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TransactionLists', {
      transactionId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      postId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'SalePosts',
          key: 'postId'
        }
      },
      userId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Users',
          key: 'userId'
        }
      },
      createdAt:{
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TransactionLists');
  }
};