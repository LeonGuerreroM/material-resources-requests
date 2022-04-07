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
    }else if(status == 5){
      options.where.processed = { [Op.eq]: null };
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

  async findByUser(userId, status){
    const options = {
      include: ['product'],
      where: { userId }
    }

    if(status == 1){
      options.where.validated = { [Op.eq]: true };
    }else if(status == 2){
      options.where.validated = { [Op.eq]: false };
    }else if(status == 3){
      options.where.processed = { [Op.eq]: true };
    }else if(status == 4){
      options.where.processed = { [Op.eq]: false };
    }else if(status == 5){
      options.where.processed = { [Op.eq]: null };
    }

    const elements = await models.Request.findAll(options);
    return elements;
  }

  async create(data){
    const newElement = await models.Request.create(data);
    return newElement;
  }

  async update(id, data, userId){
    const element = await this.findOne(id);
    if(element.userId!=userId){
      throw boom.forbidden('unreachable request');
    }
    const updatedElement = await element.update(data);
    return updatedElement;
  }

  async validate(id, data){
    const element = await this.findOne(id);
    const prevValidationStatus = element.validated;
    if(data.validated && prevValidationStatus!=true){
      const registeredDate = new Date();
      data.validatedAt = registeredDate
    }
    if(data.validated==false && prevValidationStatus==true){
      data.validatedAt = null;
    }

    const updatedElement = await element.update(data);
    return updatedElement;
  }

  async process(id, data){
    const element = await this.findOne(id);
    const preProcessedStatus = element.processed;
    if(data.processed != null && preProcessedStatus!=data.processed){
      const registeredDate = new Date();
      data.processedAt = registeredDate;
    }

    const updateElement = await element.update(data);
    return updateElement;
  }

  async delete(id, userId){
    const element = await this.findOne(id);
    if(element.userId != userId){
      throw boom.forbidden('unreachable content');
    }
    await element.destroy();
    return { confirmation: true };
  }

}

module.exports = RequestServices;
