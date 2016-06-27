var express = require('express');
var router = express.Router();

router.get('/', require('./product-handlers/get-all-products'));
router.post('/', require('./product-handlers/insert-product'));
router.get('/:id', require('./product-handlers/get-product'));
router.put('/:id', require('./product-handlers/update-product'));
router.delete('/:id', require('./product-handlers/delete-product'));

module.exports = router;