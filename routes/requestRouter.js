const express = require('express');
const RequestServices = require('../services/requestService');
const validationHandler = require('../utils/middlewares/validationHandler');
const {
  getRequestSchema,
  createRequestSchema,
  updateRequestSchema,
  queryRequestSchema,
  validateSchema,
  processSchema
} = require('../utils/schemas/requestSchema');
const passport = require('passport');
const checkRoles = require('../utils/middlewares/authHandler');


const router = express.Router();
const service = new RequestServices();

  /**
   * @module requestsRoutes
   */

const thing = "request";

  /**
   * @name getRequests
   * @path {GET} /api/v1/requests/
   *
   * @header {String} Authorization Bearer token needed to validate session and privileges (MaterialResources, DepartmentManager)
   *
   * @query {String} status request status related (1-Validated 2-Not Validated 3-Processed 4-Rejected to be processed 5-Not answered to be processed)
   *
   * @response {Object} info list of every registered request
   *
   * @code {200} correct requests list return
   * @code {401} in case of unmatched privileges or token absence
   * @code {500} in case of internal errors with the request
   *
   */
router.get('/',
  passport.authenticate('jwt', {session:false}),
  checkRoles(2, 3),
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

  /**
   * @name getUserRelatedRequests | return the requests done by the user
   * @path {GET} /api/v1/requests/my-requests
   *
   * @header {String} Authorization Bearer token needed to validate session and privileges (Lab). Used also to obtain the user id.
   *
   * @query {String} status request status related (1-Validated 2-Not Validated 3-Processed 4-Rejected to be processed 5-Not answered to be processed)
   *
   * @response {Object} info list of every registered request done by the user
   *
   * @code {200} correct requests list return
   * @code {401} in case of unmatched privileges or token absence
   * @code {500} in case of internal errors with the request
   *
   */
router.get('/my-requests',
  passport.authenticate('jwt', {session:false}),
  checkRoles(4),
  async (req, res, next) => {
    try{
      const user = req.user;
      const { status } = req.query;
      const elements = await service.findByUser(user.sub, status);
      res.json(elements);
    }catch(error){
      next(error);
    }
  }
);

  /**
   * @name getRequest
   * @path {GET} /api/v1/requests/:id
   *
   * @header {String} Authorization Bearer token needed to validate session and privileges (MaterialResources, DepartmentManager, Lab)
   *
   * @params {Number} id requested request id
   *
   * @response {Object} request requested request
   *
   * @code {200} correct request return
   * @code {401} in case of unmatched privileges or token absence
   * @code {404} in case of not founded product
   * @code {500} in case of internal errors with the request
   *
   */
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

  /**
   * @name createRequest
   * @path {POST} /api/v1/requests/
   *
   * @header {String} Authorization Bearer token needed to validate session and privileges (Lab)
   *
   * @body {Number} productId to be requested product id
   * @body {Number} amount amounts of units required
   * @body {String} [detail] some extra information wanted to include
   *
   * @response {Object} object.data created request data
   *
   * @code {201} in case of user created
   * @code {401} in case of unmatched privileges or token absence
   * @code {400} in case of wrong body parameters
   * @code {500} in case of internal errors with the request
   *
   */
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
      res.status(201).json({
        message: thing + ' created',
        data: newElement,
        status: 201
      })
    }catch(error){
      next(error);
    }
  }
);

  /**
   * @name validateRequest | Sets a request as validated o rejected by a Department Manager
   * @path {PATCH} /api/v1/requests/validate/:id
   *
   * @header {String} Authorization Bearer token needed to validate session and privileges (DepartmentManager).
   *
   * @params {Number} id request id to be validated or rejected
   *
   * @body {Boolean} validated indicates if the request was validated (true) or rejected (false)
   *
   * @response {Object} object.data updated request data
   *
   * @code {200} in case of request validated/rejected
   * @code {401} in case of unmatched privileges or token absence
   * @code {400} in case of wrong body parameters
   * @code {404} in case of not founded request
   * @code {500} in case of internal errors with the request
   *
   */
router.patch('/validate/:id',
  passport.authenticate('jwt', {session:false}),
  checkRoles(3),
  validationHandler(getRequestSchema, 'params'),
  validationHandler(validateSchema, 'body'),
  async(req, res, next) => {
    try{
      const { id } = req.params;
      const body = req.body;
      const updatedElement = await service.validate(id, body);
      res.json({
        message: thing + ' updated',
        data: updatedElement
      })
    }catch(error){
      next(error);
    }
  }
);

  /**
   * @name processRequest | Sets a request as being processed or rejected by the Material Resources Manager
   * @path {PATCH} /api/v1/requests/process/:id
   *
   * @header {String} Authorization Bearer token needed to validate session and privileges (MaterialResources).
   *
   * @params {Number} id request id to be processed or rejected
   *
   * @body {Boolean} processed indicates if the request is being processed (true) or if it was rejected (false)
   * @body {String} [note] note providing justification in case of rejection
   *
   * @response {Object} object.data updated request data
   *
   * @code {200} in case of request processed/rejected
   * @code {401} in case of unmatched privileges or token absence
   * @code {400} in case of wrong body parameters
   * @code {404} in case of not founded request
   * @code {500} in case of internal errors with the request
   *
   */
router.patch('/process/:id',
  passport.authenticate('jwt', {session:false}),
  checkRoles(2),
  validationHandler(getRequestSchema, 'params'),
  validationHandler(processSchema, 'body'),
  async(req, res, next) => {
    try{
      const { id } = req.params;
      const body = req.body;
      const updatedElement = await service.process(id, body);
      res.json({
        message: thing + ' updated',
        data: updatedElement
      })
    }catch(error){
      next(error);
    }
  }
);

  /**
   * @name updateRequest
   * @path {PATCH} /api/v1/requests/:id
   *
   * @header {String} Authorization Bearer token needed to validate session and privileges (Lab). Used also to obtain the user id.
   *
   * @body {Number} [productId] to be requested product id
   * @body {Number} [amount] amounts of units required
   * @body {String} [detail] some extra information wanted to include
   *
   * @response {Object} object.data updated request data
   *
   * @code {200} in case of request updated
   * @code {401} in case of unmatched privileges or token absence
   * @code {400} in case of wrong body parameters
   * @code {404} in case of not founded request
   * @code {500} in case of internal errors with the request
   *
   */
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

  /**
   * @name deleteRequest
   * @path {DELETE} /api/v1/requests/:id
   *
   * @header {String} Authorization Bearer token needed to validate session and privileges (Lab). Used also to obtain the user id.
   *
   * @params {Number} id requested request id
   *
   * @response {Boolean} object.confirmation done deletion boolean confirmation
   *
   * @code {200} in case of request deleted
   * @code {401} in case of unmatched privileges or token absence
   * @code {404} in case of not founded request
   * @code {500} in case of internal errors with the request
   *
   */
router.delete('/:id',
  passport.authenticate('jwt', {session:false}),
  checkRoles(4),
  validationHandler(getRequestSchema, 'params'),
  async(req, res, next) => {
    try{
      const { id } = req.params;
      const user = req.user; //asi obtienes el jwt del header desde las rutas para trabajar con el
      const userId = user.sub;
      const confirmation = await service.delete(id, userId);
      res.status(204).json({
        message: thing + ' deleted',
        status: confirmation
      })
    }catch(error){
      next(error);
    }
  }
);

module.exports = router;
