const {Model, DataTypes, Sequelize} = require('sequelize');

const USER_TABLE = 'users';


const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
}

class User extends Model {
  static associate(models) {
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'userId'
    })
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = {USER_TABLE, UserSchema, User};

  