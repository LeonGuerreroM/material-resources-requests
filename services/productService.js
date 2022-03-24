const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom')

class ProductServices{
  constructor() {}

  async find(query){ //eslint-disable-line
    const products = await models.Product.findAll({
      //include: ['requests']
    });
    return products;
  }

  async findOne(id){
    const product = await models.Product.findByPk(id, {
      //include: ['requests']
    });
    if(!product){
      throw boom.notFound('not founded product');
    }
    return product;
  }

  async create(data){
    const claveCUCoP = data.claveCUCoP;
    const requestedProduct = await models.Product.findOne({ where: { claveCUCoP } });
    if(!requestedProduct){
      const newProduct = await models.Product.create(data);
      return newProduct;
    }else{
      throw boom.badData('product already registered');
    }
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
