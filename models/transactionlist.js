'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionList extends Model {
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
  TransactionList.init({

    transactionId:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    postId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'SalePosts',
        key: 'postId'
      }
    },
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'Users',
        key: 'userId'
      }
    },
    createdAt:{
      type: DataTypes.STRING,
      allowNull: false,
    }
    

  }, {
    sequelize,
    modelName: 'TransactionList',
    timestamps: false,
  });
  return TransactionList;
};