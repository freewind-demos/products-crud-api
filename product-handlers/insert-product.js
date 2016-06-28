var helpers = require('./user-data-helpers');
var productStore = require('../product-store');

module.exports = function (req, res, next) {
  var userData = helpers.getProductData(parseInt(req.params.id), req.body);
  var invalidData = !helpers.validData(userData);
  if (invalidData) {
    return res.sendStatus(400);
  }
  productStore.save(userData, function (err, insertedData) {
    if (err) return next(err);
    res.status(201).json(insertedData);
  });
};
