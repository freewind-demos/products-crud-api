var express = require('express');
var productHandlers = require('./product-handlers');

var router = express.Router();

router.route('/')
  .get(productHandlers.getAllProducts)
  .post(productHandlers.saveProduct);

router.route('/:id(\\d+)')
  .get(productHandlers.getProduct)
  .put(productHandlers.updateProduct)
  .delete(productHandlers.deleteProduct);

module.exports = router;