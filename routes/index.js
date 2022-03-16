const express = require('express');
const { user } = require('pg/lib/defaults');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const requestRouter = require('./requestRouter');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', userRouter);
  router.use('/products', productRouter);
  router.use('/requests', requestRouter);
}

module.exports = routerApi;
