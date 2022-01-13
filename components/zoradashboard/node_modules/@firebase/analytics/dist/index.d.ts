import '@firebase/installations';
import { FirebaseAnalytics } from '@firebase/analytics-types';
import { _FirebaseNamespace } from '@firebase/app-types/private';
import { factory, settings, resetGlobalVars, getGlobalVars } from './src/factory';
declare global {
    interface Window {
        [key: string]: unknown;
    }
}
export declare function registerAnalytics(instance: _FirebaseNamespace): void;
export { factory, settings, resetGlobalVars, getGlobalVars };
/**
 * Define extension behavior of `registerAnalytics`
 */
declare module '@firebase/app-types' {
    interface FirebaseNamespace {
        analytics(app?: FirebaseApp): FirebaseAnalytics;
    }
    interface FirebaseApp {
        analytics(): FirebaseAnalytics;
    }
}
