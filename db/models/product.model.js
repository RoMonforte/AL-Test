const {Model, DataTypes, Sequelize} = require('sequelize');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
    code: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    price: {
        allowNull: false,
        type: DataTypes.FLOAT
    },
}

class Product extends Model {
    static associate(models) {
      this.belongsTo(models.User, {as: 'product_in_order'})
    }
    static config(sequelize) {
      return {
        sequelize,
        tableName: PRODUCT_TABLE,
        modelName: 'Product',
        timestamps: false
      }
    }
  }
  
  module.exports = {PRODUCT_TABLE, ProductSchema, Product}
  