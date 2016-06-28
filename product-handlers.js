var productStore = require('./product-store');
var HttpCode = require('http-status-codes');

function _validData(data) {
  return typeof data.barcode == 'string' &&
    typeof data.name == 'string' &&
    typeof data.unit == 'string' &&
    typeof data.price == 'number';
}

function _getProductData(id, body) {
  return {
    "id": id,
    "barcode": body.barcode,
    "name": body.name,
    "unit": body.unit,
    "price": body.price
  };
}

function deleteProduct(req, res, next) {
  var id = parseInt(req.params.id);
  productStore.deleteById(id, function (err, deleted) {
    if (err)  return next(err);
    if (deleted) {
      res.sendStatus(HttpCode.NO_CONTENT);
    } else {
      res.sendStatus(HttpCode.NOT_FOUND);
    }
  });
}

function getAllProducts(req, res, next) {
  productStore.getAll(function (err, items) {
    if (err) return next(err);
    res.status(HttpCode.OK).json(items);
  });
}

function getProduct(req, res, next) {
  var id = parseInt(req.params.id);
  productStore.findById(id, function (err, found) {
    if (err) return next(err);
    if (found) {
      res.status(HttpCode.OK).json(found);
    } else {
      res.sendStatus(HttpCode.NOT_FOUND);
    }
  });
}

function saveProduct(req, res, next) {
  var userData = _getProductData(parseInt(req.params.id), req.body);
  var invalidData = !_validData(userData);
  if (invalidData) {
    return res.sendStatus(HttpCode.BAD_REQUEST);
  }
  productStore.save(userData, function (err, insertedData) {
    if (err) return next(err);
    res.status(HttpCode.CREATED).json(insertedData);
  });
}

function updateProduct(req, res, next) {
  var modifiedData = _getProductData(parseInt(req.params.id), req.body);
  var invalidData = !_validData(modifiedData);
  if (invalidData) {
    return res.sendStatus(HttpCode.BAD_REQUEST);
  }
  productStore.update(modifiedData, function (err, updated) {
    if (err) return next(err);
    if (updated) {
      res.status(HttpCode.OK).json(modifiedData);
    } else {
      res.sendStatus(HttpCode.NOT_FOUND);
    }
  });
}

module.exports = {
  getAllProducts: getAllProducts,
  deleteProduct: deleteProduct,
  getProduct: getProduct,
  saveProduct: saveProduct,
  updateProduct: updateProduct
};