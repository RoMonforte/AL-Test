const Joi = require('joi');

const id = Joi.number().integer();
const userId = Joi.number().integer();

const getOrderSchema = Joi.object({
    id: id.required(),
});

const createOrderSchema = Joi.object({
    userId: userId.required(),
})

module.exports = { getOrderSchema, createOrderSchema}