var storeSystem = require('./product-store-system');

function _readAndSave(callback, operateOnStore) {
  storeSystem.read(function (err, store) {
    if (err) return callback(err);
    var result = operateOnStore(store);
    storeSystem.write(store, function (err) {
      if (err) return callback(err);
      callback(null, result);
    });
  });
}

function getAll(callback) {
  storeSystem.read(function (err, store) {
    if (err) return callback(err);
    callback(null, store.getItems());
  })
}

function findById(id, callback) {
  storeSystem.read(function (err, store) {
    if (err) return callback(err);
    callback(null, store.findById(id));
  });
}

function deleteById(id, callback) {
  _readAndSave(callback, function (store) {
    var exists = store.findById(id);
    if (exists) {
      store.deleteById(id);
      return true;
    } else {
      return false;
    }
  });
}

function save(data, callback) {
  _readAndSave(callback, function (store) {
    return store.insert(data);
  });
}

function update(modifiedItem, callback) {
  _readAndSave(callback, function (store) {
    var exists = store.findById(modifiedItem.id);
    if (exists) {
      store.update(modifiedItem.id, modifiedItem);
      return modifiedItem;
    } else {
      return null;
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