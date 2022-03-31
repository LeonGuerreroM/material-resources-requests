const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');


const thing = "request";
class RequestServices{
  constructor() {}

  async find(query){ //eslint-disable-line
    const options = {
      include: ['user', 'product'],
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
    const element = await models.Request.findByPk(id, {
      include: ['user', 'product']
    });
    if(!element){
      throw boom.notFound('not founded ' + thing);
    }
    return element;
  }

  async findByUser(userId){
    const options = {
      include: ['product'],
      where: { userId }
    }
    const elements = await models.Request.findAll(options);
    return elements;
  }

  async create(data){
    const newElement = await models.Request.create(data);
    return newElement;
  }

  async update(id, data){
    const element = await this.findOne(id);
    const prevValidationStatus = element.validated;
    if(data.validated){
      const dt = new Date();
      data.validatedAt = dt
    }
    if(data.validated==false && prevValidationStatus==true){
      data.validatedAt = null;
    }
    if(data.processed != null){
      const dt = new Date();
      data.processedAt = dt
    }
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
