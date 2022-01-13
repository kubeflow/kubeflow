export declare class GoogleOAuth {
    initialized: boolean;
    constructor();
    refreshGoogleToken(): Promise<unknown>;
    private _refreshGoogleTokenImpl;
}
/**
 * @deprecated use named import
 */
export default GoogleOAuth;
