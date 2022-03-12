const { UserCategory, userCategorySchema } =  require('./userCategoryModel.js');
const { Department, departmentSchema } =  require('./departmentModel.js');
const { User, userSchema } =  require('./userModel.js');
const { Product, productSchema } =  require('./productModel.js');
const { Request, requestSchema } =  require('./requestModel.js');

function setupModels(sequelize){
  UserCategory.init(userCategorySchema, UserCategory.config(sequelize));
  Department.init(departmentSchema, Department.config(sequelize));
  User.init(userSchema, User.config(sequelize));
  Product.init(productSchema, Product.config(sequelize));
  Request.init(requestSchema, Request.config(sequelize));

  UserCategory.associate(sequelize.models);
  Department.associate(sequelize.models);
  User.associate(sequelize.models);
  Product.associate(sequelize.models);
  Request.associate(sequelize.models);

}

module.exports = setupModels;
