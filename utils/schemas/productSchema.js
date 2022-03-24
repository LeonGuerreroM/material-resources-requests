const Joi = require('@hapi/joi');

const id = Joi.number().integer();
const claveCUCoP = Joi.string().length(8).alphanum();
const partida = Joi.string().length(5).alphanum();
const name = Joi.string().max(150);
const unit = Joi.string().max(50);

const getProductSchema = Joi.object({
  id: id.required()
});

const createProductSchema = Joi.object({
  claveCUCoP: claveCUCoP.required(),
  partida: partida.required(),
  name: name.required(),
  unit: unit.required(),
});

const updateProductSchema = Joi.object({
  claveCUCoP: claveCUCoP,
  partida: partida,
  name: name,
  unit: unit
});

module.exports = { getProductSchema, createProductSchema, updateProductSchema };


