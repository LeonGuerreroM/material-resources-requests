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

  /**
   * @module UsersRoutes
   */

  /**
   * @name getUsers
   * @path {GET} /api/v1/users/
   *
   * @header {String} Authorization Bearer token needed to validate session and privileges (Admin)
   *
   * @response {Object} users list of every registered user
   *
   * @code {200} correct users list return
   * @code {401} in case of unmatched privileges or token absence
   * @code {500} in case of internal errors with the request
   *
   */
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

  /**
   * @name getUser
   * @path {GET} /api/v1/users/:id
   *
   * @header {String} Authorization Bearer token needed to validate session and privileges (Admin, MaterialResources, DepartmentManager, Lab)
   *
   * @params {String} username requested user related username
   *
   * @response {Object} user requested user
   *
   * @code {200} correct user return
   * @code {401} in case of unmatched privileges or token absence
   * @code {404} in case of not founded user
   * @code {500} in case of internal errors with the request
   *
   */
router.get('/:username',
  passport.authenticate('jwt', {session:false}),
  checkRoles(1, 2, 3, 4),
  validationHandler(getUserSchema, 'params'),
  async(req, res, next) => {
    try{
      const { username } = req.params;
      const user = await service.findByUsername(username);
      res.json(user);
    } catch(error) {
      next(error);
    }
  }
);

  /**
   * @name createUser
   * @path {POST} /api/v1/users/
   *
   * @header {String} Authorization Bearer token needed to validate session and privileges (Admin)
   *
   * @body {String} username user related username, will be a credential
   * @body {String} password at least 8 characters length
   * @body {Number} departmentId related department id
   * @body {Number} userCategoryId user's category (1-Admin 2-MaterialResources 3-DepartmentManager 4-Lab)
   * @body {String} [area] user related area
   *
   * @response {Object} object.data created user data
   *
   * @code {201} in case of user created
   * @code {401} in case of unmatched privileges or token absence
   * @code {400} in case of wrong body parameters
   * @code {500} in case of internal errors with the request
   *
   */
router.post('/',
  passport.authenticate('jwt', {session:false}),
  checkRoles(1),
  validationHandler(createUserSchema, 'body'),
  async(req, res, next) => {
    try{
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json( {
        message: 'user created',
        data: newUser
      });
    } catch(error) {
      next(error);
    }
  }
);

  /**
   * @name updateUser
   * @path {PATCH} /api/v1/user/
   *
   * @header {String} Authorization Bearer token needed to validate session and privileges (MaterialResources, DepartmentManager, Lab). Used also to obtain the user id.
   *
   * @body {String} [username] user related username, remember is a credential
   * @body {String} [password] at least 8 characters length
   * @body {Number} [departmentId] related department id
   * @body {Number} [userCategoryId] user's category (1-Admin 2-MaterialResources 3-DepartmentManager 4-Lab)
   * @body {String} [area] user related area
   *
   * @response {Object} object.data updated user data
   *
   * @code {200} in case of user updated
   * @code {401} in case of unmatched privileges or token absence
   * @code {400} in case of wrong body parameters
   * @code {404} in case of not founded user
   * @code {500} in case of internal errors with the request
   *
   */
router.patch('/',
  passport.authenticate('jwt', {session:false}),
  checkRoles(2, 3, 4),
  validationHandler(updateUserSchema, 'body'),
  async(req, res, next) => {
    try{
      const subCont = req.user;
      const body = req.body;
      const user = await service.update(subCont.sub, body);
      res.json( {
        message: 'user updated',
        data: user
      });
    } catch(error) {
      next(error);
    }
  }
);

  /**
   * @name deleteUser
   * @path {DELETE} /api/v1/user/:id
   *
   * @header {String} Authorization Bearer token needed to validate session and privileges (Admin)
   *
   * @params {Number} id requested user id
   *
   * @response {Boolean} object.confirmation done deletion boolean confirmation
   *
   * @code {200} in case of user deleted
   * @code {401} in case of unmatched privileges or token absence
   * @code {404} in case of not founded user
   * @code {500} in case of internal errors with the request
   *
   */
router.delete('/:id',
  passport.authenticate('jwt', {session:false}),
  checkRoles(1),
  validationHandler(getUserSchema, 'params'),
  async(req, res, next) => {
    try{
      const { id } = req.params;
      const confirmation = await service.delete(id);
      res.status(204).json( {
        message: 'user deleted',
        data: confirmation
      });
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;
