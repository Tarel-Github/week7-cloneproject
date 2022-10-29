'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Chats,{
        as: 'Chats',
        foreignKey:'chatListId',
      })

      this.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'userId' });
      this.belongsTo(models.SalePosts, { foreignKey: 'postId', targetKey: 'postId' });
      
    }
  }
  ChatList.init({

    chatListId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'SalePosts',
        key:'postId'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'Users',
        key:'userId'
      }
    },
    lastMessage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }

  }, {
    sequelize,
    modelName: 'ChatList',
  });
  return ChatList;
};