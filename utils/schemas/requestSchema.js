const Joi =  require('@hapi/joi');

const id = Joi.number().integer();
const productId = Joi.number().integer();
const detail = Joi.string();
const amount = Joi.number().integer();
const userId = Joi.number().integer();
const validated = Joi.boolean();
const validatedAt = Joi.date();
const processed = Joi.boolean();
const processedAt = Joi.date();
const note = Joi.string();

const status = Joi.number().integer();

const getRequestSchema = Joi.object({
  id: id.required()
});

const createRequestSchema = Joi.object({
  productId: productId.required(),
  detail: detail,
  amount: amount.required(),
  userId: userId.required(),
});

const updateRequestSchema = Joi.object({
  productId: productId,
  detail: detail,
  amount: amount,
  userId: userId,
  validated: validated,
  validatedAt: validatedAt,
  processed: processed,
  processedAt: processedAt,
  note: note
});

const queryRequestSchema = Joi.object({
  status: status
});

module.exports = { getRequestSchema, createRequestSchema, updateRequestSchema, queryRequestSchema };
