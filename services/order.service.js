const boom = require ('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {
    constructor() {}

    async find() {
        const orders = await models.Order.findAll(
            {
                include: ['user','items']
            }
        );
        return orders;
    }

    async create(data) {
        const newOrder = await models.Order.create(data, {
            include: ['user','items']
        });
        return newOrder;
    }

    async findOne(id) {
        const order = await models.Order.findByPk(id, {
            include: ['user','items']
        },
        );
        if (!order) {
            throw boom.notFound('Order not found!')
        }
        return order;
    }

    async addItem(data) {
        const newItem = await models.OrderProduct.create(data);
        return newItem;
    }

    async removeItem(code) {
        const removeItem = await models.OrderProduct.destroy({
            where: {
                productCode: code
            }
        });
        if (removeItem === 0) {
            return{message: 'Item not found'};
        }
        return {message: 'Item deleted successfully.'};
    }
}

module.exports = OrderService;