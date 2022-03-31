const express = require('express');
const UserServices = require('../services/userService.js');
const validationHandler =  require('../utils/middlewares/validationHandler');
const {
  getUserSchema,
  createUserSchema,
  updateUserSchema
} = require('../utils/schemas/userSchema');
const passport = require('passport');
const checkRoles = require('../utils/middlewares/authHandler');

const router = express.Router();
const service = new UserServices()

router.get('/',
  passport.authenticate('jwt', {session:false}),
  checkRoles(1),
  async(req, res, next) => {
    try{
      const users = await service.find(req.query);
      res.json(users);
    } catch(error) {
      next(error);
    }
  }
);

router.get('/:id',
  passport.authenticate('jwt', {session:false}),
  checkRoles(1, 2, 3, 4),
  validationHandler(getUserSchema, 'params'),
  async(req, res, next) => {
    try{
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch(error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', {session:false}),
  checkRoles(1),
  validationHandler(createUserSchema, 'body'),
  async(req, res, next) => {
    try{
      const body = req.body;
      const newUser = await service.create(body);
      res.json( {
        message: 'user created',
        data: newUser
      });
    } catch(error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', {session:false}),
  checkRoles(2, 3, 4),
  validationHandler(getUserSchema, 'params'),
  validationHandler(updateUserSchema, 'body'),
  async(req, res, next) => {
    try{
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json( {
        message: 'user updated',
        data: user
      });
    } catch(error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', {session:false}),
  checkRoles(1),
  validationHandler(getUserSchema, 'params'),
  async(req, res, next) => {
    try{
      const { id } = req.params;
      const confirmation = await service.delete(id);
      res.json( {
        message: 'user deleted',
        data: confirmation
      });
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;
