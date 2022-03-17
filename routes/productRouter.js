const express = require('express');
const ProductServices = require('../services/productService');

const router = express.Router();
const service = new ProductServices();

router.get('/', async(req, res, next) => {
  try{
    const products = await service.find(req.query);
    res.json(products);
  }catch(error){
    next(error);
  }
});

router.get('/:id', async(req, res, next) => {
  try{
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  }catch(error){
    next(error)
  }
});

router.post('/', async(req, res, next) => {
  try{
    const body = req.body;
    const newProduct = await service.create(body);
    res.json({
      message: 'product created',
      data: newProduct
    })
  }catch(error){
    next(error);
  }
});

router.patch('/:id', async(req, res, next) => {
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
})

router.delete('/:id', async(req, res, next) => {
  try{
    const { id } = req.params;
    const confirmation = await service.delete(id);
    res.json({
      message: "product deleted",
      data: confirmation
    })
  }catch{
    next(error);
  }
});

module.exports = router;