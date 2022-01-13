import * as types from '@firebase/functions-types';
declare module '@firebase/app-types' {
    interface FirebaseNamespace {
        functions?: {
            (app?: FirebaseApp): types.FirebaseFunctions;
            Functions: typeof types.FirebaseFunctions;
        };
    }
    interface FirebaseApp {
        functions?(regionOrCustomDomain?: string): types.FirebaseFunctions;
    }
}
