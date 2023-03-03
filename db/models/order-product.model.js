const {Model, DataTypes, Sequelize} = require('sequelize');
const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');

const ORDER_PRODUCT_TABLE = 'orders_has_products';

const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
    orderId: {
        field: 'order_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: ORDER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    productCode: {
        field: 'product_code',
        allowNull: false,
        type: DataTypes.STRING,
        references: {
            model: PRODUCT_TABLE,
            key: 'code'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    amount: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
}

class OrderProduct extends Model {
    static associate(models) {

    }

    static config(sequelize) {
      return {
        sequelize,
        tableName: ORDER_PRODUCT_TABLE,
        modelName: 'OrderProduct',
        timestamps: false
      }
    }
  }
  
  module.exports = {ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct}