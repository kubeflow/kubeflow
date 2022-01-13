import { browserOrNode, isWebWorker } from '@aws-amplify/core';
var getDefaultAdapter = function () {
    var isBrowser = browserOrNode().isBrowser;
    if ((isBrowser && window.indexedDB) || (isWebWorker() && self.indexedDB)) {
        return require('../IndexedDBAdapter').default;
    }
    var AsyncStorageAdapter = require('../AsyncStorageAdapter').AsyncStorageAdapter;
    return new AsyncStorageAdapter();
};
export default getDefaultAdapter;
//# sourceMappingURL=index.js.map