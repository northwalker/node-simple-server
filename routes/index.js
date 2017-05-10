(function () {
  'use strict';
  const express = require('express');
  const TodoService = require('./TodoService');

  const apiRouter = express.Router();

  // Enable CORS from client-side
  // apiRouter.use(function (req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  //   res.header("Access-Control-Allow-Credentials", "true");
  //   next();
  // });

  apiRouter.use('/todos', TodoService);

  module.exports = apiRouter;
})();
