const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');
const { options } = require('pg/lib/defaults');

class RequestServices{
  constructor() {}

  async find(query){
    const options = {
      //include: ['category'],
      where: {}
    }

    const { status } = query;
    if(status == 1){
      options.where.validated = { [Op.eq]: true };
    }else if(status == 2){
      options.where.validated = { [Op.eq]: false };
    }else if(status == 3){
      options.where.processed = { [Op.eq]: true };
    }else if(status == 4){
      options.where.processed = { [Op.eq]: false };
    }

    const info = await models.Request.findAll(options);
    return info;
  }

  async findOne(id){
    const element = await models.Request.findByPk(id);
    return element;
  }

  async create(data){
    if(data.validated){
      console.log('trajo '+ data.validated);
    }
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
