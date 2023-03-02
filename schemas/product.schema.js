const Joi = require('joi');

const code = Joi.string();
const name = Joi.string().min(3);
const price = Joi.number();

const createProductSchema = Joi.object({
    code: code.required(),
    name: name.required(),
    price: price.required(),
  })

  const updateProductSchema = Joi.object({
    code: code,
    name: name,
    price: price
  });

  const getProductSchema = Joi.object({
    code: code.required(),
  });

  module.exports = {createProductSchema, updateProductSchema, getProductSchema};