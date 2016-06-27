var productManager = require('../product-manager');

module.exports = function (req, res, next) {
  var id = parseInt(req.params.id);
  productManager.deleteById(id, function (err, deleted) {
    if (err)  return next(err);
    if (deleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });
};
