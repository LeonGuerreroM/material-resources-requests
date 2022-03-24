const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

class UserServices{

  constructor(){}

  async find(){
    const users = await models.User.findAll({
      include: ['userCategory', 'department']
      //include: ['userCategory', 'department', 'requests']
    });
    return users;
  }

  async findOne(id){
    const user = await models.User.findByPk(id, {
      include: ['userCategory', 'department']
      //include: ['userCategory', 'department', 'requests']
    });
    if(!user){
      throw boom.notFound('not founded user');
    }
    delete user.dataValues.password;
    return user;
  }

  async create(data){
    const { username } = data;
    const foundUser = await models.User.findOne({ where: {username} });
    if(foundUser){
      throw boom.badData('username already registered');
    }else{
      const hash = await bcrypt.hash(data.password, 10);
      const secureData = {
        ...data,
        password: hash
      }
      const newUser = await models.User.create(secureData);
      delete newUser.dataValues.password;
      return newUser;
    }
  }

  async update(id, changes){
    const searchedUser = await this.findOne(id);
    const updatedUser = await searchedUser.update(changes);
    delete updatedUser.dataValues.password;
    return updatedUser;
  }

  async delete(id){
    const searchedUser = await this.findOne(id);
    await searchedUser.destroy();
    return { answer: true };
  }

}

module.exports = UserServices;
