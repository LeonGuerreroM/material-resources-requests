const { Model, DataTypes, Sequelize } = require('sequelize');
const { PRODUCTS_TABLE } = require('./productModel.js');
const { USER_TABLE } = require('./userModel.js');

const REQUEST_TABLE = 'tbl_solicitudes';

const requestSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCTS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  detail: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  validated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  validatedAt: {
    field: 'validated_at',
    allowNull: true,
    type: DataTypes.DATE
  },
  processed: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  processedAt: {
    field: 'processed_at',
    allowNull: true,
    type: DataTypes.DATE
  },
  note: {
    allowNull: true,
    type: DataTypes.TEXT
  }

}

class Request extends Model {
  static associate(){

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: REQUEST_TABLE,
      modelName: 'Request',
      timestamps: false
    }
  }
}

module.exports = { REQUEST_TABLE, requestSchema, Request }
