var productManager = require('../product-manager');

module.exports = function (req, res, next) {
  productManager.getAll(function (err, items) {
    if (err) return next(err);
    res.status(200).json(items);
  });
};
