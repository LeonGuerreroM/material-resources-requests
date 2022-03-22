const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom'); //eslint-disable-line

class UserServices{

  constructor(){}

  async find(){
    const users = await models.User.findAll();
    return users;
  }

  async findOne(id){
    const user = await models.User.findByPk(id);
    return user;
  }

  async create(data){
    const { username } = data;
    const foundUser = await models.User.findOne({ where: {username} });
    if(foundUser){
      throw boom.badData('username already registered');
    }else{
      const newUser = await models.User.create(data);
      return newUser;
    }
  }

  async update(id, changes){
    const searchedUser = await this.findOne(id);
    const updatedUser = await searchedUser.update(changes);
    return updatedUser;
  }

  async delete(id){
    const searchedUser = await this.findOne(id);
    await searchedUser.destroy();
    return { answer: true };
  }

}

module.exports = UserServices;
