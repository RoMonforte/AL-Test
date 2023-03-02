const {Product, ProductSchema} = require('./product.model');
const {User, UserSchema} = require('./user.model');
const {Order, OrderSchema } = require ('./order.model');

function setupModels(sequelize) {
    Product.init(ProductSchema, Product.config(sequelize));
    User.init(UserSchema, User.config(sequelize));
    Order.init(OrderSchema, Order.config(sequelize));

    User.associate(sequelize.models);
    Product.associate(sequelize.models);
    Order.associate(sequelize.models);
}

module.exports = setupModels;