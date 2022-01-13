if (typeof indexedDB != 'undefined') {
  module.exports = require('../build/idb.js');
}
else {
  module.exports = {
    openDb: function () {
      return Promise.reject('IDB requires a browser environment');
    },
    deleteDb: function () {
      return Promise.reject('IDB requires a browser environment');
    }
  };
}
