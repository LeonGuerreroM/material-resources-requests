const express = require('express');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const { config } = require('../config/config');

const router = express.Router();

  /**
   * @module AuthenticationRoutes
   */

  /**
   * @name login
   * @path {POST} /api/v1/auth/login
   *
   * @body {String} username user's registered username
   * @body {String} password
   *
   * @response {Object}
   * @response {String} object.user authenticated user
   * @response {String} object.token bearer token needed to access every function related to the user
   *
   * @code {200} if the credentials were correct
   * @code {400} in case of wrong body parameters
   * @code {401} in case of wrong credentials
   * @code {500} in case of internal errors with the request
   *
   */
router.post('/login',
  passport.authenticate('local', {session:false}),
  async(req, res, next) => {
    try{
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.userCategoryId
      }
      const token = jwt.sign(payload, config.jwtSecret);
      res.json({
        user,
        token
      });
    }catch(error){
      next(error);
    }
  }
);

module.exports = router;
