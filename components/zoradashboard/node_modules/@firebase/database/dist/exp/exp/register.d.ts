import { FirebaseDatabase } from '../src/exp/Database';
declare module '@firebase/component' {
    interface NameServiceMapping {
        'database-exp': FirebaseDatabase;
    }
}
export declare function registerDatabase(variant?: string): void;
