var helpers = require('./user-data-helpers');
var productManager = require('../product-manager');

module.exports = function (req, res, next) {
  var modifiedData = helpers.getProductData(parseInt(req.params.id), req.body);
  var invalidData = !helpers.validData(modifiedData);
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
};
