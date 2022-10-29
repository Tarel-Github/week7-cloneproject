'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'userId' });
      this.belongsTo(models.ChatList, { foreignKey: 'chatListId', targetKey: 'chatListId' });

    }
  }
  Chats.init({
    chatId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'Users',
        key: 'userId'
      }
    },
    chatListId:{
      type: DataTypes.INTEGER,
      references:{
        model: 'ChatList',
        key: 'chatListId'
      }
    },
    message:{
      type: DataTypes.TEXT,
    },
    isRead:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt:{
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Chats',
  });
  return Chats;
};