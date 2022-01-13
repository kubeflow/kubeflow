import AsyncStorage from '@react-native-async-storage/async-storage';

// See: https://react-native-async-storage.github.io/async-storage/
export function createInMemoryStore() {
	return AsyncStorage;
}
