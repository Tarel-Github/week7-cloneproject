'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chats', {
      chatId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'userId'
        }
      },
      chatListId:{
        type: Sequelize.INTEGER,
        references:{
          model: 'ChatList',
          key: 'chatListId'
        }
      },
      message:{
        type: Sequelize.TEXT,
      },
      isRead:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt:{
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Chats');
  }
};