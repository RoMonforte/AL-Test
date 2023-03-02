const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require ('bcrypt');
const { where } = require('sequelize');

class ProductsService {
    constructor() {}

    async create(data) {
        const newProduct = await models.Product.create(data);
        return newProduct;
    }

    async find() {
        const products = await models.Product.findAll();
        return products;
      }

    async findOne(code) {
        const product = await models.Product.findOne({ where: { code } });
        if (!product) {
            throw boom.notFound('Product not found!')
        }
        return product;
    }

    async update(code, changes) {
        const product = await this.findOne(code);
        const rta = await product.update(changes);
        return rta;
    }

    async delete(code) {
        const product = await this.findOne(code);
        await product.destroy();
        return { code };
      }
}

module.exports = ProductsService;