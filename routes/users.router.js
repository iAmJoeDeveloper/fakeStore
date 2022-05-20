//const faker = require('faker');
const express = require('express');
const router = express.Router();

//Query Params
router.get('/', (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('There are not params');
  }
});

module.exports = router;
