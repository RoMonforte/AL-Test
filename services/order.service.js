const boom = require ('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {
    constructor() {}

    async find() {
        const orders = await models.Order.findAll(
            {
                include: [
                    {
                        model: models.User,
                        as: 'user',
                        attributes: { exclude: ['role', 'password','createdAt'] }
                    },
                    {
                        model: models.Product,
                        as: 'items',
                        through: { attributes: ['id', 'productCode', 'amount'] },
                        attributes: { exclude: ['createdAt'] }
                    }
                ]
            }
        );
        return orders;
    }

    async create(data) {
        const newOrder = await models.Order.create(data, {
            include: [{
                model: models.User,
                as: 'user',
                attributes: { exclude: ['role', 'password','createdAt'] }
            },
            {
                model: models.Product,
                as: 'items',
                through: { attributes: ['id', 'productCode', 'amount'] },
                attributes: { exclude: ['createdAt'] }
            }]
        });
        return newOrder;
    }

    async findOne(id) {
        const order = await models.Order.findByPk(id, {
            include: [{
                model: models.User,
                as: 'user',
                attributes: { exclude: ['role', 'password','createdAt'] }
            },
            {
                model: models.Product,
                as: 'items',
                through: { attributes: ['id', 'productCode', 'amount'] },
                attributes: { exclude: ['createdAt'] }
            }]
        },
        );
        if (!order) {
            throw boom.notFound('Order not found!')
        }
        return order;
    }

    async addItem(data) {
        const existingItem = await models.OrderProduct.findOne({
            where: { orderId: data.orderId, productCode: data.productCode }
          });
          if (existingItem) {
            const updatedItem = await existingItem.update({
              amount: existingItem.amount + data.amount
            });
            return updatedItem;
          } else {
            const newItem = await models.OrderProduct.create(data);
            return newItem;
          }
    }

    async removeItem(code, amount) {
        const item = await models.OrderProduct.findOne({
          where: { productCode: code }
        });
        if (item) {
          const oldAmount = await item.amount;
          const newAmount = await oldAmount - amount;
          if (newAmount > 0) {
            await item.update({ amount: newAmount });
            return { message: 'Amount removed from item successfully.' };
          } else {
            await item.destroy();
            return { message: 'Item deleted successfully.' };
          }
        } else {
          return { message: 'Item not found.' };
        }
      }
}

module.exports = OrderService;