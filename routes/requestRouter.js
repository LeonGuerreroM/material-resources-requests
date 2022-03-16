const express = require('express');
const RequestServices = require('../services/requestService');

const router = express.Router();
const service = new RequestServices();

const thing = "request";

router.get('/', async(req, res, next) => {
  try{
    const info = await service.find(req.query);
    res.json(info);
  }catch(error){
    next(error);
  }
});

router.get('/:id', async(req, res, next) => {
  try{
    const { id } = req.params;
    const element = await service.findOne(id);
    res.json(element);
  }catch(error){
    next(error);
  }
});

router.post('/', async(req, res, next) => {
  try{
    const body = req.body;
    const newElement = await service.create(body);
    res.json({
      message: thing + 'created',
      data: newElement
    })
  }catch(error){
    next(error);
  }
});

router.patch('/:id', async(req, res, next) => {
  try{
    const { id } = req.params;
    const body = req.body;
    const updatedElement = await service.update(id, body);
    res.json({
      message: thing + 'updated',
      data: updatedElement
    })
  }catch(error){
    next(error);
  }
});

router.delete('/:id', async(req, res, next) => {
  try{
    const { id } = req.params;
    const confirmation = await service.delete(id);
    res.json({
      message: thing + 'deleted',
      status: confirmation
    })
  }catch(error){
    next(error);
  }
});

module.exports = router;
