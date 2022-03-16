'use strict';

const { userCategorySchema, USERCATEGORY_TABLE } = require('../models/userCategoryModel.js');
const { departmentSchema, DEPARTMENT_TABLE } = require('../models/departmentModel.js');
const { userSchema, USER_TABLE } = require('../models/userModel.js');
const { productSchema, PRODUCT_TABLE } = require('../models/productModel')
const { requestSchema, REQUEST_TABLE } = require('../models/requestModel.js');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USERCATEGORY_TABLE, userCategorySchema);
    await queryInterface.createTable(DEPARTMENT_TABLE, departmentSchema);
    await queryInterface.createTable(USER_TABLE, userSchema);
    await queryInterface.createTable(PRODUCT_TABLE, productSchema);
    await queryInterface.createTable(REQUEST_TABLE, requestSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(REQUEST_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(USERCATEGORY_TABLE);
    await queryInterface.dropTable(DEPARTMENT_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
