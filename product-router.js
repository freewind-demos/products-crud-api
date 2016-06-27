var express = require('express');
var router = express.Router();

router.route('/')
  .get(require('./product-handlers/get-all-products'))
  .post(require('./product-handlers/insert-product'));

router.route('/:id(\\d+)')
  .get(require('./product-handlers/get-product'))
  .put(require('./product-handlers/update-product'))
  .delete(require('./product-handlers/delete-product'));

module.exports = router;