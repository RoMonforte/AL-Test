const express = require('express');

const UsersService = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createUserSchema, updateUserSchema, getUserSchema} = require('../schemas/user.schema');
const passport = require('passport');
const {checkRoles} = require ('../middlewares/auth.handler');


const router = express.Router();
const service = new UsersService();

router.get('/',
async (req, res, next) => {
    try {
        const users = await service.find();
        res.json(users);
    } catch (err) {
        next(err)
    }
});

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;