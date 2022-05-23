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

  /**
   * @module productsRoutes
   */

  /**
   * @name getProducts
   * @path {GET} /api/v1/products/
   *
   * @header {String} Authorization Bearer token needed to validate session and privileges (Admin)
   *
   * @response {Object} products list of every registered product
   *
   * @code {200} correct products list return
   * @code {401} in case of unmatched privileges or token absence
   * @code {500} in case of internal errors with the request
   *
   */
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

  /**
   * @name getProduct
   * @path {GET} /api/v1/products/:id
   *
   * @header {String} Authorization Bearer token needed to validate session and privileges (Admin, Lab)
   *
   * @params {Number} id requested product id
   *
   * @response {Object} product requested product
   *
   * @code {200} correct product return
   * @code {401} in case of unmatched privileges or token absence
   * @code {404} in case of not founded product
   * @code {500} in case of internal errors with the request
   *
   */
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

  /**
   * @name createProduct
   * @path {POST} /api/v1/products/
   *
   * @header {String} Authorization Bearer token needed to validate session and privileges (Admin)
   *
   * @body {String} claveCUCoP product CUCoP key related
   * @body {String} partida product partida related
   * @body {String} name product name
   * @body {String} unit measurement unit related
   *
   * @response {Object} object.data created product data
   *
   * @code {201} in case of product created
   * @code {401} in case of unmatched privileges or token absence
   * @code {400} in case of wrong body parameters
   * @code {500} in case of internal errors with the request
   *
   */
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

/**
   * @name updateProduct
   * @path {PATCH} /api/v1/products/:id
   *
   * @header {String} Authorization Bearer token needed to validate session and privileges (Admin)
   *
   * @params {Number} id requested product id
   *
   * @body {String} [claveCUCoP] product CUCoP key related
   * @body {String} [partida] product partida related
   * @body {String} [name] product name
   * @body {String} [unit] measurement unit related
   *
   * @response {Object} object.data updated product data
   *
   * @code {200} in case of product updated
   * @code {401} in case of unmatched privileges or token absence
   * @code {400} in case of wrong body parameters
   * @code {404} in case of not founded product
   * @code {500} in case of internal errors with the request
   *
   */
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

/**
   * @name deleteProduct
   * @path {DELETE} /api/v1/products/:id
   *
   * @header {String} Authorization Bearer token needed to validate session and privileges (Admin)
   *
   * @params {Number} id requested product id
   *
   * @response {Boolean} object.confirmation done deletion boolean confirmation
   *
   * @code {200} in case of product deleted
   * @code {401} in case of unmatched privileges or token absence
   * @code {404} in case of not founded product
   * @code {500} in case of internal errors with the request
   *
   */
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
