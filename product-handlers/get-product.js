var productManager = require('../product-manager');

module.exports = function (req, res, next) {
  var id = parseInt(req.params.id);
  productManager.findById(id, function (err, found) {
    if (err) return next(err);
    if (found) {
      res.status(200).json(found);
    } else {
      res.sendStatus(404);
    }
  });
};
