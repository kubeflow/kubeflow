import { Amplify } from './Amplify';
export { AmplifyClass } from './Amplify';
export { ClientDevice } from './ClientDevice';
export { ConsoleLogger, ConsoleLogger as Logger } from './Logger';
export * from './Errors';
export { Hub, HubCapsule, HubCallback, HubPayload } from './Hub';
export { I18n } from './I18n';
export * from './JS';
export { Signer } from './Signer';
export * from './Parser';
export * from './Providers';
export { FacebookOAuth, GoogleOAuth } from './OAuthHelper';
export * from './RNComponents';
export { Credentials, CredentialsClass } from './Credentials';
export { ServiceWorker } from './ServiceWorker';
export { ICredentials } from './types';
export { StorageHelper, MemoryStorage } from './StorageHelper';
export { UniversalStorage } from './UniversalStorage';
export { Platform, getAmplifyUserAgent } from './Platform';
export * from './constants';
export declare const Constants: {
    userAgent: string;
};
export * from './constants';
export * from './Util';
export { Amplify };
/**
 * @deprecated use named import
 */
export default Amplify;
