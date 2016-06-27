var _ = require('lodash');

function _replaceItem(items, id, newData) {
  var index = _.findIndex(items, function (item) {
    return item.id === id;
  });
  if (index >= 0) {
    items.splice(index, 1, newData);
  }
}

function _findById(store, id) {
  return _.find(store.items, function (item) {
    return item.id === id;
  });
}

function _rejectById(items, id) {
  return _.reject(items, function (item) {
    return item.id === id;
  });
}

function wrap(_raw) {
  return {
    getRaw: function () {
      return _raw;
    },
    getItems: function () {
      return _raw.items;
    },
    findById: function (id) {
      return _findById(_raw, id);
    },
    update: function (id, modifiedItem) {
      _replaceItem(_raw.items, id, modifiedItem);
    },
    deleteById: function (id) {
      _raw.items = _rejectById(_raw.items, id);
    },
    insert: function (data) {
      data.id = _raw.nextId;
      _raw.items.push(data);
      _raw.nextId += 1;
      return data;
    }
  }
}

module.exports = {
  empty: wrap({
    nextId: 1,
    items: []
  }),
  wrap: wrap
};