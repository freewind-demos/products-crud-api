var express = require('express');
var bodyParser = require('body-parser');
var storeSystem = require('./product-store-system');

storeSystem.initSync();

var app = express();
app.use(bodyParser.json());

app.use('/products', require('./product-router'));

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send('Some errors happened, please see the log on server');
});

var server = app.listen(3000, function () {
  console.log('Server listening at:' + server.address().port);
});
