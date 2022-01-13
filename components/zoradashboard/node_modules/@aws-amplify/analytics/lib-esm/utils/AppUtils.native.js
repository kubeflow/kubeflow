import { AppState } from 'react-native';
var isAppInForeground = function () {
    return AppState.currentState === 'active';
};
export { isAppInForeground };
//# sourceMappingURL=AppUtils.native.js.map