const Joi =  require('@hapi/joi');

const id = Joi.number().integer();
const productId = Joi.number().integer();
const detail = Joi.string();
const amount = Joi.number().integer();
const validated = Joi.boolean();
const processed = Joi.boolean();
const note = Joi.string();

const status = Joi.number().integer();

const getRequestSchema = Joi.object({
  id: id.required()
});

const createRequestSchema = Joi.object({
  productId: productId.required(),
  detail: detail,
  amount: amount.required(),
});

const validateSchema = Joi.object({
  validated: validated.required(),
});

const processSchema = Joi.object({
  processed: processed.required(),
  note: note
});

const updateRequestSchema = Joi.object({
  productId: productId,
  detail: detail,
  amount: amount,
});

const queryRequestSchema = Joi.object({
  status: status
});

module.exports = { getRequestSchema, createRequestSchema, updateRequestSchema, queryRequestSchema, validateSchema, processSchema };
