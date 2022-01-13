import { browserOrNode, isWebWorker } from '@aws-amplify/core';
import { Adapter } from '..';

const getDefaultAdapter: () => Adapter = () => {
	const { isBrowser } = browserOrNode();

	if ((isBrowser && window.indexedDB) || (isWebWorker() && self.indexedDB)) {
		return require('../IndexedDBAdapter').default;
	}

	const { AsyncStorageAdapter } = require('../AsyncStorageAdapter');

	return new AsyncStorageAdapter();
};

export default getDefaultAdapter;
