'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here   
      this.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'userId' });
      this.belongsTo(models.SalePosts, { foreignKey: 'postId', targetKey: 'postId' });

    }
  }
  Wishes.init({
    wishId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId'
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'SalePosts',
        key: 'postId'
      }
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Wishes',
    timestamps: false,
  });
  return Wishes;
};