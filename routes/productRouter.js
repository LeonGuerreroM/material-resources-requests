const express = require('express');
const ProductServices = require('../services/productService');
const validationHandler =  require('../utils/middlewares/validationHandler');
const {
  getProductSchema,
  createProductSchema,
  updateProductSchema
} = require('../utils/schemas/productSchema');
const passport = require('passport');
const checkRoles = require('../utils/middlewares/authHandler');

const router = express.Router();
const service = new ProductServices();

router.get('/',
  passport.authenticate('jwt', {session:false}),
  checkRoles(1),
  async(req, res, next) => {
    try{
      const products = await service.find(req.query);
      res.json(products);
    }catch(error){
      next(error);
    }
  }
);

router.get('/:id',
  passport.authenticate('jwt', {session:false}),
  checkRoles(1, 4),
  validationHandler(getProductSchema, 'params'),
  async(req, res, next) => {
    try{
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    }catch(error){
      next(error)
    }
  }
);

router.post('/',
  passport.authenticate('jwt', {session:false}),
  checkRoles(1),
  validationHandler(createProductSchema, 'body'),
  async(req, res, next) => {
    try{
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json({
        message: 'product created',
        data: newProduct
      })
    }catch(error){
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', {session:false}),
  checkRoles(1),
  validationHandler(getProductSchema, 'params'),
  validationHandler(updateProductSchema, 'body'),
  async(req, res, next) => {
    try{
      const { id } = req.params;
      const body = req.body;
      const updatedProduct = await service.update(id, body);
      res.json({
        message: 'product updated',
        data: updatedProduct
      })
    }catch(error){
      next(error);
    }
  }
)

router.delete('/:id',
  passport.authenticate('jwt', {session:false}),
  checkRoles(1),
  validationHandler(getProductSchema, 'params'),
  async(req, res, next) => {
    try{
      const { id } = req.params;
      const confirmation = await service.delete(id);
      res.status(204).json({
        message: "product deleted",
        data: confirmation
      })
    }catch(error){
      next(error);
    }
  }
);

module.exports = router;
