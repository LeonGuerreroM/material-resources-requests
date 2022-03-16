const { Model, DataTypes, Sequelize } = require('sequelize');

const USERCATEGORY_TABLE = 'cat_tipoUsr';

const userCategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  category: {
    allowNull: false,
    type: DataTypes.TEXT
  }
}

class UserCategory extends Model {
  static associate(models){
    this.hasMany(models.User, {
      as: 'users',
      foreignKey: 'userCategoryId'
    });
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: USERCATEGORY_TABLE,
      modelName: 'UserCategory',
      timestamps: false
    }
  }
}


module.exports = { USERCATEGORY_TABLE, userCategorySchema, UserCategory }
