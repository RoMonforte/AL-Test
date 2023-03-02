const {Product, ProductSchema} = require('./product.model');
const {User, UserSchema} = require('./user.model');

function setupModels(sequelize) {
    Product.init(ProductSchema, Product.config(sequelize));
    User.init(UserSchema, User.config(sequelize));

    //association
}

module.exports = setupModels;