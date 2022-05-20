//Import Service
const CategoriesService = require('./../services/categories.service');
//
const express = require('express');
const router = express.Router();
//Create New instance
const service = new CategoriesService();

router.get('/', (req, res) => {
  res.json(service);
});

//findOne
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json(service.findOne(id));
});

/* router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;

  res.json({
    categoryId,
    productId,
  });
}); */

module.exports = router;
