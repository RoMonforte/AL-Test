const express = require('express');

const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createOrderSchema, getOrderSchema, addItemSchema, removeItemSchema} = require('../schemas/order.schema');
const passport = require('passport');
const {checkRoles} = require ('../middlewares/auth.handler');


const router = express.Router();
const service = new OrderService();

router.get('/',
async (req, res, next) => {
    try {
        const orders = await service.find();
        res.json(orders);
    } catch (err) {
        next(err)
    }
});

router.get('/my-orders',
passport.authenticate("jwt", { session: false }),
async (req, res, next) => {
    try {
        const user = req.user;
        const orders = await service.findByUser(user.sub);
        res.json(orders);
    } catch (err) {
        next(err)
    }
});

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/remove-item',
validatorHandler(removeItemSchema, 'body'),
async (req, res, next) => {
  try {
    const  code  = req.body.productCode;
    const amount = req.body.amount;
    const deletedItem = await service.removeItem(code, amount);
    res.status(200).json(deletedItem);
  } catch (error) {
    next(error);
  }
}
)

module.exports = router;