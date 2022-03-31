const express = require('express');
const RequestServices = require('../services/requestService');
const validationHandler = require('../utils/middlewares/validationHandler');
const {
  getRequestSchema,
  createRequestSchema,
  updateRequestSchema,
  queryRequestSchema,
  validateOrProcessSchema
} = require('../utils/schemas/requestSchema');
const passport = require('passport');
const checkRoles = require('../utils/middlewares/authHandler');


const router = express.Router();
const service = new RequestServices();

const thing = "request";

router.get('/',
  //passport.authenticate('jwt', {session:false}),
  //checkRoles(2, 3, 4),
  validationHandler(queryRequestSchema, 'query'),
  async(req, res, next) => {
    try{
      const info = await service.find(req.query);
      res.json(info);
    }catch(error){
      next(error);
    }
  }
);

router.get('/my-requests',
  passport.authenticate('jwt', {session:false}),
  checkRoles(4),
  async (req, res, next) => {
    try{
      const user = req.user;
      const elements = await service.findByUser(user.sub);
      res.json(elements);
    }catch(error){
      next(error);
    }
  }
);

router.get('/:id',
  passport.authenticate('jwt', {session:false}),
  checkRoles(2, 3, 4),
  validationHandler(getRequestSchema, 'params'),
  async(req, res, next) => {
    try{
      const { id } = req.params;
      const element = await service.findOne(id);
      res.json(element);
    }catch(error){
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', {session:false}),
  checkRoles(4),
  validationHandler(createRequestSchema, 'body'),
  async(req, res, next) => {
    try{
      const body = req.body;
      const user = req.user;
      body.userId = user.sub;
      const newElement = await service.create(body);
      res.json({
        message: thing + ' created',
        data: newElement
      })
    }catch(error){
      next(error);
    }
  }
);

router.patch('/validateOrProcess/:id',
  //passport.authenticate('jwt', {session:false}),
  //checkRoles(2, 3),
  validationHandler(getRequestSchema, 'params'),
  validationHandler(validateOrProcessSchema, 'body'),
  async(req, res, next) => {
    try{
      const { id } = req.params;
      const body = req.body;
      const updatedElement = await service.validateOrProcess(id, body);
      res.json({
        message: thing + ' updated',
        data: updatedElement
      })
    }catch(error){
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles(4),
  validationHandler(getRequestSchema, 'params'),
  validationHandler(updateRequestSchema, 'body'),
  async (req, res, next) => {
    try{
      const { id } = req.params;
      const body = req.body;
      const user = req.user;
      const userId = user.sub;
      const updatedElement = await service.update(id, body, userId);
      res.json({
        message: thing + ' updated',
        data: updatedElement
      })
    }catch(error){
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', {session:false}),
  checkRoles(4),
  validationHandler(getRequestSchema, 'params'),
  async(req, res, next) => {
    try{
      const { id } = req.params;
      const confirmation = await service.delete(id);
      res.json({
        message: thing + ' deleted',
        status: confirmation
      })
    }catch(error){
      next(error);
    }
  }
);

module.exports = router;
