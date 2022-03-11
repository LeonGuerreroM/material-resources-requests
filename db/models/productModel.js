const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCTS_TABLE = 'tbl_productos';

const productSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  claveCUCoP: {
    allowNull: false,
    type: DataTypes.STRING
  },
  partida: {
    allowNull: false,
    type: DataTypes.STRING
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  unit: {
    allowNull: false,
    type: DataTypes.STRING
  }
}

class Product extends Model {
  static associate(){

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: PRODUCTS_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = { PRODUCTS_TABLE, productSchema, Product }
