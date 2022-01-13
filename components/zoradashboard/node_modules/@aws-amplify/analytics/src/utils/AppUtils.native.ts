import { AppState } from 'react-native';

const isAppInForeground = () => {
	return AppState.currentState === 'active';
};

export { isAppInForeground };
