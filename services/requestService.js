const { models } = require('../libs/sequelize');

class RequestServices{
  constructor() {}

  async find(query){
    const info = await models.Request.findAll();
    return info;
  }

  async findOne(id){
    const element = await models.Request.findByPk(id);
    return element;
  }

  async create(data){
    const newElement = await models.Request.create(data);
    return newElement;
  }

  async update(id, data){
    const element = await this.findOne(id);
    const updatedElement = await element.update(data);
    return updatedElement;
  }

  async delete(id){
    const element = await this.findOne(id);
    await element.destroy();
    return { confirmation: true };
  }

}

module.exports = RequestServices;
