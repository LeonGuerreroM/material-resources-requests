const Joi = require('@hapi/joi');

const username = Joi.string().min(3).max(50);
const password = Joi.string().min(8);
const userCategoryId = Joi.number().integer();
const departmentId = Joi.number().integer();
const area = Joi.string();

const getUserSchema = Joi.object({
  username: username.required()
});

const createUserSchema = Joi.object({
  username: username.required(),
  password: password.required(),
  userCategoryId: userCategoryId.required(),
  departmentId: departmentId.required(),
  area: area
});

const updateUserSchema = Joi.object({
  username: username,
  password: password,
  userCategoryId: userCategoryId,
  departmentId: departmentId,
  area: area
});

module.exports = { getUserSchema, createUserSchema, updateUserSchema };
