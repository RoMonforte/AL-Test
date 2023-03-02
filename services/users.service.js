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

    async findOne(id) {
        const user = await models.User.findByPk(id);
        if (!user) {
            throw boom.notFound('User not found!')
        }
        delete user.dataValues.password;
        return user;
    }
}

module.exports = UsersService;