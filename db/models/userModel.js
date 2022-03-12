const { Model, DataTypes, Sequelize } = require('sequelize');
const { USERCATEGORY_TABLE } = require('./userCategoryModel.js.js')
const { DEPARTMENT_TABLE } = require('./departmentModel.js')

const USER_TABLE = 'tbl_usuario';

const userSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  userCategoryId: {
    field: 'user_category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USERCATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  departmentId: {
    field: 'department_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: DEPARTMENT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  area: {
    allowNull: true,
    type: DataTypes.STRING
  }
}

class User extends Model {
  static associate(models){
    this.belongsTo(models.UserCategory, { as: 'userCategories' });
    this.belongsTo(models.Department, { as: 'departments' });
    this.hasMany(models.Request, {
      as: 'requests',
      foreignKey: 'userId'
    });
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = { USER_TABLE, userSchema, User }
