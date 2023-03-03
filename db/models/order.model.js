const {Model, DataTypes, Sequelize} = require('sequelize');
const { USER_TABLE } = require('./user.model')

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
    userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      total: {
        type: DataTypes.VIRTUAL,
        get() {
          if(this.items && this.items.length >= 0) {
            return this.items.reduce((total, item) => {
              return total + (item.price * item.OrderProduct.amount);
            }, 0)            
          }
          return 0;
        }
      },
      pantsDiscount: {
        type: DataTypes.VIRTUAL,
        get() {
          if (this.items && this.items.length >= 1) {
            const pantsItems = this.items.filter(item => item.code === 'PANTS');
            const pantsCount = pantsItems.reduce((total, item) => total + item.OrderProduct.amount, 0);
            if (pantsCount >= 2) {
              const pantsPrice = pantsItems[0].price;
              const freePantsCount = Math.floor(pantsCount / 2);
              const discountAmount = freePantsCount * pantsPrice;
              return discountAmount > this.amount ? this.amount : discountAmount;
            }
          }
          return 0;
        }
      },
      bulkDiscount: {
        type: DataTypes.VIRTUAL,
        get() {
          if (this.items && this.items.length >= 1) {
            const tshirtItems = this.items.filter(item => item.code === 'TSHIRT');
            const tshirtCount = tshirtItems.reduce((total, item) => total + item.OrderProduct.amount, 0);
            if (tshirtCount >= 3) {
              const tshirtPrice = 19.00;
              const originalPrice = tshirtItems[0].price;
              const discountAmount = (originalPrice - tshirtPrice) * tshirtCount;
              return discountAmount;
            }
          }
          return 0;
        }       
      },
      toPay: {
        type: DataTypes.VIRTUAL,
        get() {
          if (this.items && this.items.length >= 1) {
            return this.total - this.pantsDiscount - this. bulkDiscount
          }
          return 0;
        }
      }
      
}

class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User, {as: 'user'});
      this.belongsToMany(models.Product, {
        as: 'items', 
        through: models.OrderProduct,
        foreignKey: 'orderId',
        otherKey: 'productCode'
      })
    }
    static config(sequelize) {
      return {
        sequelize,
        tableName: ORDER_TABLE,
        modelName: 'Order',
        timestamps: false
      }
    }
  }
  
  module.exports = {ORDER_TABLE, OrderSchema, Order}