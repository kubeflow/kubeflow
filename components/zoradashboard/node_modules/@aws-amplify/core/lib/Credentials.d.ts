import { ICredentials } from './types';
export declare class CredentialsClass {
    private _config;
    private _credentials;
    private _credentials_source;
    private _gettingCredPromise;
    private _refreshHandlers;
    private _storage;
    private _storageSync;
    private _identityId;
    private _nextCredentialsRefresh;
    Auth: any;
    constructor(config: any);
    getModuleName(): string;
    getCredSource(): any;
    configure(config: any): any;
    get(): any;
    private _getCognitoIdentityIdStorageKey;
    private _pickupCredentials;
    private _keepAlive;
    refreshFederatedToken(federatedInfo: any): any;
    private _providerRefreshWithRetry;
    private _isExpired;
    private _isPastTTL;
    private _setCredentialsForGuest;
    private _setCredentialsFromFederation;
    private _setCredentialsFromSession;
    private _loadCredentials;
    set(params: any, source: any): Promise<ICredentials>;
    clear(): Promise<void>;
    private _getGuestIdentityId;
    private _setGuestIdentityId;
    private _removeGuestIdentityId;
    /**
     * Compact version of credentials
     * @param {Object} credentials
     * @return {Object} - Credentials
     */
    shear(credentials: any): {
        accessKeyId: any;
        sessionToken: any;
        secretAccessKey: any;
        identityId: any;
        authenticated: any;
    };
}
export declare const Credentials: CredentialsClass;
/**
 * @deprecated use named import
 */
export default Credentials;
