import { FirebaseAppCheck } from '@firebase/app-check-types';
/**
 * Define extension behavior of `registerAnalytics`
 */
declare module '@firebase/app-types' {
    interface FirebaseNamespace {
        appCheck(app?: FirebaseApp): FirebaseAppCheck;
    }
    interface FirebaseApp {
        appCheck(): FirebaseAppCheck;
    }
}
