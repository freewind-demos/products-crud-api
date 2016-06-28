var storeFs = require('./product-store-file-system');
var _ = require('lodash');

function _readAndSave(callback, operateOnStore) {
  storeFs.read(function (err, store) {
    if (err) return callback(err);
    var result = operateOnStore(store);
    storeFs.write(store, function (err) {
      if (err) return callback(err);
      callback(null, result);
    });
  });
}

function getAll(callback) {
  storeFs.read(function (err, store) {
    if (err) return callback(err);
    callback(null, store.items);
  })
}

function _findById(store, id) {
  return _.find(store.items, function (item) {
    return item.id === id;
  });
}

function findById(id, callback) {
  storeFs.read(function (err, store) {
    if (err) return callback(err);
    callback(null, _findById(store, id));
  });
}

function _deleteById(store, id) {
  store.items = _.reject(store.items, function (item) {
    return item.id === id;
  });
}

function deleteById(id, callback) {
  _readAndSave(callback, function (store) {
    var found = _findById(store, id);
    if (found) {
      _deleteById(store, id);
      return true;
    } else {
      return false;
    }
  });
}

function _save(store, data) {
  data.id = store.nextId;
  store.items.push(data);
  store.nextId += 1;
  return data;
}

function save(data, callback) {
  _readAndSave(callback, function (store) {
    return _save(store, data);
  });
}

function _update(store, id, newData) {
  var index = _.findIndex(store.items, function (item) {
    return item.id === id;
  });
  if (index >= 0) {
    store.items.splice(index, 1, newData);
  }
}

function update(modifiedItem, callback) {
  _readAndSave(callback, function (store) {
    var found = _findById(store, modifiedItem.id);
    if (found) {
      _update(store, modifiedItem.id, modifiedItem);
      return true;
    } else {
      return false;
    }
  })
}

module.exports = {
  getAll: getAll,
  findById: findById,
  deleteById: deleteById,
  save: save,
  update: update
};