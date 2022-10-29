'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalePosts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here


      this.hasMany(models.Wishes,{
        as: 'Wishes',
        foreignKey:'postId'
      })
      this.hasMany(models.TransactionList,{
        as: 'TransactionList',
        foreignKey:'postId'
      })
      this.hasMany(models.ChatList,{
        as: 'ChatList',
        foreignKey:'postId'
      })

      this.belongsTo(models.Locations, { foreignKey: 'locationId', targetKey: 'locationId' });
      this.belongsTo(models.Categories, { foreignKey: 'categoryId', targetKey: 'categoryId' });
      this.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'userId' });

    }
  }
  SalePosts.init({

    postId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'categoryId'
      }
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Locations',
        key: 'locationId'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postImgUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wishCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chatCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.STRING,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'SalePosts',
  });
  return SalePosts;
};