var helpers = require('./user-data-helpers');
var productStore = require('../product-store');

module.exports = function (req, res, next) {
  var modifiedData = helpers.getProductData(parseInt(req.params.id), req.body);
  var invalidData = !helpers.validData(modifiedData);
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
};
