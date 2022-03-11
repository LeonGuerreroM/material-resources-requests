const { Model, DataTypes, Sequelize } = require('sequelize');
const setupModels = require('.');

const DEPARTMENT_TABLE = 'cat_departamentos';

const departmentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  department: {
    allowNull: false,
    type: DataTypes.TEXT
  }
}

class Department extends Model {
  static associate(){

  }

  static config(sequelize){
    return{
      sequelize,
      tableName: DEPARTMENT_TABLE,
      modelName: 'Department',
      timestamps: false
    }
  }
}

module.exports = { DEPARTMENT_TABLE, departmentSchema, Department }
