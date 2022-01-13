export declare class FacebookOAuth {
    initialized: boolean;
    constructor();
    refreshFacebookToken(): Promise<unknown>;
    private _refreshFacebookTokenImpl;
}
/**
 * @deprecated use named import
 */
export default FacebookOAuth;
