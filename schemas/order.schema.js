const Joi = require('joi');

const id = Joi.number().integer();
const userId = Joi.number().integer();
const orderId = Joi.number().integer();
const productCode = Joi.string();
const amount = Joi.number().integer().min(1);

const getOrderSchema = Joi.object({
    id: id.required(),
});

const createOrderSchema = Joi.object({
    userId: userId.required(),
});

const addItemSchema = Joi.object({
    orderId: orderId.required(),
    productCode: productCode.required(),
    amount: amount.required(),
})

const removeItemSchema = Joi.object({
    orderId: orderId.required(),
    productCode: productCode.required(),       
})



module.exports = { getOrderSchema, createOrderSchema, addItemSchema, removeItemSchema}