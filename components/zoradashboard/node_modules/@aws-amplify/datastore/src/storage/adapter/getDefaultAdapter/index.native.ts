import { Adapter } from '..';
import AsyncStorageAdapter from '../AsyncStorageAdapter';

const getDefaultAdapter: () => Adapter = () => {
	return AsyncStorageAdapter;
};

export default getDefaultAdapter;
