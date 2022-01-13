import { FirebaseNamespace } from '@firebase/app-types';
import './register-module';
/**
 * Registers the main Firestore Node build with the components framework.
 * Persistence can be enabled via `firebase.firestore().enablePersistence()`.
 */
export declare function registerFirestore(instance: FirebaseNamespace): void;
