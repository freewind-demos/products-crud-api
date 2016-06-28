var productStore = require('./product-store');

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
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });
}

function getAllProducts(req, res, next) {
  productStore.getAll(function (err, items) {
    if (err) return next(err);
    res.status(200).json(items);
  });
}

function getProduct(req, res, next) {
  var id = parseInt(req.params.id);
  productStore.findById(id, function (err, found) {
    if (err) return next(err);
    if (found) {
      res.status(200).json(found);
    } else {
      res.sendStatus(404);
    }
  });
}

function saveProduct(req, res, next) {
  var userData = _getProductData(parseInt(req.params.id), req.body);
  var invalidData = !_validData(userData);
  if (invalidData) {
    return res.sendStatus(400);
  }
  productStore.save(userData, function (err, insertedData) {
    if (err) return next(err);
    res.status(201).json(insertedData);
  });
}

function updateProduct(req, res, next) {
  var modifiedData = _getProductData(parseInt(req.params.id), req.body);
  var invalidData = !_validData(modifiedData);
  if (invalidData) {
    return res.sendStatus(400);
  }
  productStore.update(modifiedData, function (err, updated) {
    if (err) return next(err);
    if (updated) {
      res.status(200).json(modifiedData);
    } else {
      res.sendStatus(404);
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