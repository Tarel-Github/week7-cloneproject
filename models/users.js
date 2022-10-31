'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.Notifications,{
        as: 'Notifications',
        foreignKey:'userId'
      })
      this.hasMany(models.TransactionList,{
        as: 'TransactionList',
        foreignKey:'userId'
      })
      this.hasMany(models.Wishes,{
        as: 'Wishes',
        foreignKey:'userId'
      })
      this.hasMany(models.SalePosts,{
        as: 'SalePosts',
        foreignKey:'userId'
      })
      this.hasMany(models.Chats,{
        as: 'Chats',
        foreignKey:'userId'
      })
      this.hasMany(models.ChatList,{
        as: 'ChatList',
        foreignKey:'userId'
      })

      this.belongsTo(models.Locations, { foreignKey: 'locationId', targetKey: 'locationId' });

    }
  }
  Users.init({
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'Locations',
        key:'locationId'
      }
    },
    nickname: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    password:  {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    profileImage:{
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    createdAt: DataTypes.STRING(40),
    updatedAt: DataTypes.STRING(40)
  }, {
    sequelize,
    modelName: 'Users',
    timestamps: false,
  });
  return Users;
};