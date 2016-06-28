var fs = require('fs');

var DATA_FILE = './store.json';
var CHARSET = 'utf-8';
var EMPTY_STORE = {
  nextId: 1,
  items: []
};

function read(callback) {
  fs.readFile(DATA_FILE, CHARSET, function (err, content) {
    callback(err, content && JSON.parse(content));
  });
}

function write(store, callback) {
  fs.writeFile(DATA_FILE, JSON.stringify(store), callback);
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
    fs.writeFileSync(DATA_FILE, JSON.stringify(EMPTY_STORE));
  }
}

module.exports = {
  read: read,
  write: write,
  initSync: initSync
};