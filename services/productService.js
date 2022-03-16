const { models } = require('../libs/sequelize');

class ProductServices{
  constructor() {}

  async find(query){
    const products = await models.Product.findAll();
    return products;
  }

  async findOne(id){
    const product = await models.Product.findByPk(id);
    return product;
  }

  async create(data){
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async update(id, data){
    const product = await this.findOne(id);
    const updatedProduct = await product.update(data);
    return updatedProduct;
  }

  async delete(id){
    const product = await this.findOne(id);
    await product.destroy();
    return {confirmation: true}
  }

}

module.exports = ProductServices;
