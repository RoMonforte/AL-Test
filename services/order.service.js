const boom = require ('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {
    constructor() {}

    async find() {
        const orders = await models.Order.findAll();
        return orders;
    }

    async create(data) {
        const newOrder = await models.Order.create(data);
        return newOrder;
    }

    async findOne(id) {
        const order = await models.Order.findByPk(id);
        if (!order) {
            throw boom.notFound('Order not found!')
        }
        return order;
    }
}

module.exports = OrderService;