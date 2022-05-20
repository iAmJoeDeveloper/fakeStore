//Import Services
const ProductsService = require('./../services/product.service');
//
const express = require('express');
const router = express.Router();
const service = new ProductsService();

//Importamos nuestro validator y nuestro Schema
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('./../schemas/product.schema');

router.get('/', async (req, res) => {
  const productList = await service.find();

  res.json(productList);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

//Find One
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    //const id = req.params.id
    try {
      const { id } = req.params; //destructuring
      const product = await service.findOne(id);

      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

//Create a new Product
router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);

    res.status(201).json({
      message: 'created',
      newProduct,
    });
  }
);

//Modify partialy a product with PATH
router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);

      res.json({
        message: 'update',
        product,
      });
    } catch (error) {
      // res.status(404).json({
      //   message: error.message,
      // });
      next(error);
    }
  }
);

//DELETE a Product
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await service.delete(id);

  res.json({
    message: 'Product Deleted',
    deleteProduct,
  });
});

module.exports = router;
