var fs = require('fs');
var store = require('./product-store');

var DATA_FILE = './store.json';
var CHARSET = 'utf-8';

function _storeToJson(store) {
  return JSON.stringify(store.getRaw());
}

function _jsonToStore(json) {
  return store.wrap(JSON.parse(json));
}

function read(callback) {
  fs.readFile(DATA_FILE, CHARSET, function (err, content) {
    callback(err, content && _jsonToStore(content));
  });
}

function write(store, callback) {
  fs.writeFile(DATA_FILE, _storeToJson(store), callback);
}

function _fileExistsSync(path) {
  try {
    var stat = fs.statSync(path);
    return stat.isFile();
  } catch (err) {
    return false;
  }
}

function initSync() {
  var dataFileNotFound = !_fileExistsSync(DATA_FILE);
  if (dataFileNotFound) {
    fs.writeFileSync(DATA_FILE, _storeToJson(store.empty));
  }
}

module.exports = {
  read: read,
  write: write,
  initSync: initSync
};