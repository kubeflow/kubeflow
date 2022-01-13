import { ConsoleLogger as LoggerClass } from './Logger';
export declare class AmplifyClass {
    private _components;
    private _config;
    private _modules;
    Auth: any;
    Analytics: any;
    API: any;
    Credentials: any;
    Storage: any;
    I18n: any;
    Cache: any;
    PubSub: any;
    Interactions: any;
    Pushnotification: any;
    UI: any;
    XR: any;
    Predictions: any;
    DataStore: any;
    Logger: typeof LoggerClass;
    ServiceWorker: any;
    register(comp: any): void;
    configure(config?: any): {};
    addPluggable(pluggable: any): void;
}
export declare const Amplify: AmplifyClass;
/**
 * @deprecated use named import
 */
export default Amplify;
