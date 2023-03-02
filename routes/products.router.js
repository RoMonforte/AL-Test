const express = require('express');

const ProductsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createProductSchema, updateProductSchema, getProductSchema} = require('../schemas/product.schema');
const passport = require('passport');
const {checkRoles} = require ('../middlewares/auth.handler');


const router = express.Router();
const service = new ProductsService();

router.get('/',
async (req, res, next) => {
    try {
        const products = await service.find();
        res.json(products);
    } catch (err) {
        next(err)
    }
});

router.get('/:code',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { code } = req.params;
      const product = await service.findOne(code);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:code',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { code } = req.params;
      const body = req.body;
      const product = await service.update(code, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:code',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { code } = req.params;
      await service.delete(code);
      res.status(201).json({code});
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;