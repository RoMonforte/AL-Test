const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require ('bcrypt');

class UsersService {
    constructor() {}

    async create(data) {
        const hash = await bcrypt.hash(data.password, 10)
        const newUser = await models.User.create({
            ...data,
            password: hash
        })
        delete newUser.dataValues.password;
        return newUser;
    }

    async find() {
        const rta = await models.User.findAll({
            attributes: { exclude: ['password'] }
          });
        return rta;
      }

    async findOne(id) {
        const user = await models.User.findByPk(id);
        if (!user) {
            throw boom.notFound('User not found!')
        }
        delete user.dataValues.password;
        return user;
    }

    async findByUsername(username) {
        const rta = await models.User.findOne( {
          where: {username}
        });
        return rta;
    
      }

    async update(id, changes) {
        const user = await this.findOne(id);
        const rta = await user.update(changes);
        return rta;
    }

    async delete(id) {
        const user = await this.findOne(id);
        await user.destroy();
        return { id };
      }
}

module.exports = UsersService;