const express = require('express');
const UserServices = require('../services/userService.js');

const router = express.Router();
const service = new UserServices()

router.get('/', async(req, res, next) => {
    try{
      const users = await service.find(req.query);
      res.json(users);
    } catch(error) {
      next(error);
    }
});

router.get('/:id', async(req, res, next) => {
    try{
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch(error) {
      next(error);
    }
});

router.post('/', async(req, res, next) => {
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
});

router.patch('/:id', async(req, res, next) => {
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
});

router.delete('/:id', async(req, res, next) => {
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
});

module.exports = router;
