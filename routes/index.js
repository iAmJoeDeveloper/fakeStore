const express = require('express');
const home = require('./home.router');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');

function routerApi(app) {
  //Generamos un Path global para los v1 endpoints
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/', home);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = routerApi;
