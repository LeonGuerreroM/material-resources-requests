const { Model, DataTypes, Sequelize } = require('sequelize'); //eslint-disable-line

const PRODUCT_TABLE = 'tbl_productos';

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
  static associate(models){
    this.hasMany(models.Request, {
      as: 'requests',
      foreignKey: 'productId'
    });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = { PRODUCT_TABLE, productSchema, Product }
