var productStore = require('../product-store');

module.exports = function (req, res, next) {
  productStore.getAll(function (err, items) {
    if (err) return next(err);
    res.status(200).json(items);
  });
};
