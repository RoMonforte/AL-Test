const express = require('express');
const swaggerUi = require('swagger-ui-express');

const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const ordersRouter = require('./orders.router');
const authRouter = require('./auth.router');
const swaggerDoc = require('./swagger.json')

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    router.use('/products', productsRouter);
    router.use('/users', usersRouter);
    router.use('/orders', ordersRouter);
    router.use('/auth', authRouter);
}

module.exports = routerApi