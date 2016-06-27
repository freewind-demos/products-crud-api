var express = require('express');
var productManager = require('./product-manager');

var router = express.Router();

function _validData(data) {
  return typeof data.barcode == 'string' &&
    typeof data.name == 'string' &&
    typeof data.unit == 'string' &&
    typeof data.price == 'number';
}

function _getUserData(id, body) {
  return {
    "id": id,
    "barcode": body.barcode,
    "name": body.name,
    "unit": body.unit,
    "price": body.price
  };
}

function insertProduct(req, res, next) {
  var userData = _getUserData(parseInt(req.params.id), req.body);
  var invalidData = !_validData(userData);
  if (invalidData) {
    return res.sendStatus(400);
  }
  productManager.save(userData, function (err, insertedData) {
    if (err) return next(err);
    res.status(201).json(insertedData);
  });
}

function updateProduct(req, res, next) {
  var modifiedData = _getUserData(parseInt(req.params.id), req.body);
  var invalidData = !_validData(modifiedData);
  if (invalidData) {
    return res.sendStatus(400);
  }
  productManager.update(modifiedData, function (err, item) {
    if (err) return next(err);
    if (item) {
      res.status(201).json(item);
    } else {
      res.sendStatus(404);
    }
  });
}

function deleteProduct(req, res, next) {
  var id = parseInt(req.params.id);
  productManager.deleteById(id, function (err, deleted) {
    if (err)  return next(err);
    if (deleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });
}

function getAllProducts(req, res, next) {
  productManager.getAll(function (err, items) {
    if (err) return next(err);
    res.status(200).json(items);
  });
}

function getProduct(req, res, next) {
  var id = parseInt(req.params.id);
  productManager.findById(id, function (err, found) {
    if (err) return next(err);
    if (found) {
      res.status(200).json(found);
    } else {
      res.sendStatus(404);
    }
  });
}

router.get('/', getAllProducts);
router.post('/', insertProduct);
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;