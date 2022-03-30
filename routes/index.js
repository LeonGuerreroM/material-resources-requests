const express = require('express');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const requestRouter = require('./requestRouter');
const authRouter = require('./authRouter');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', userRouter);
  router.use('/products', productRouter);
  router.use('/requests', requestRouter);
  router.use('/auth', authRouter);
}

module.exports = routerApi;
