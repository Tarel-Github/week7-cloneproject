'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Locations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.Users,{
        as: 'Users',
        foreignKey:'locationId'
      })
      this.hasMany(models.SalePosts,{
        as: 'SalePosts',
        foreignKey:'locationId'
      })

    }
  }
  Locations.init({

    locationId:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    locationName:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }

  }, {
    sequelize,
    modelName: 'Locations',
    timestamps: false,
  });
  return Locations;
};