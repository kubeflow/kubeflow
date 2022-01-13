import { Auth0ClientOptions, RedirectLoginOptions, PopupLoginOptions, PopupConfigOptions, GetUserOptions, GetIdTokenClaimsOptions, RedirectLoginResult, GetTokenSilentlyOptions, GetTokenWithPopupOptions, LogoutOptions, CacheLocation, LogoutUrlOptions, User, IdToken } from './global';
/**
 * Auth0 SDK for Single Page Applications using [Authorization Code Grant Flow with PKCE](https://auth0.com/docs/api-auth/tutorials/authorization-code-grant-pkce).
 */
export default class Auth0Client {
    private options;
    private transactionManager;
    private cacheManager;
    private customOptions;
    private domainUrl;
    private tokenIssuer;
    private defaultScope;
    private scope;
    private cookieStorage;
    private sessionCheckExpiryDays;
    cacheLocation: CacheLocation;
    private worker;
    constructor(options: Auth0ClientOptions);
    private _url;
    private _getParams;
    private _authorizeUrl;
    private _verifyIdToken;
    private _parseNumber;
    /**
     * ```js
     * await auth0.buildAuthorizeUrl(options);
     * ```
     *
     * Builds an `/authorize` URL for loginWithRedirect using the parameters
     * provided as arguments. Random and secure `state` and `nonce`
     * parameters will be auto-generated.
     *
     * @param options
     */
    buildAuthorizeUrl(options?: RedirectLoginOptions): Promise<string>;
    /**
     * ```js
     * try {
     *  await auth0.loginWithPopup(options);
     * } catch(e) {
     *  if (e instanceof PopupCancelledError) {
     *    // Popup was closed before login completed
     *  }
     * }
     * ```
     *
     * Opens a popup with the `/authorize` URL using the parameters
     * provided as arguments. Random and secure `state` and `nonce`
     * parameters will be auto-generated. If the response is successful,
     * results will be valid according to their expiration times.
     *
     * IMPORTANT: This method has to be called from an event handler
     * that was started by the user like a button click, for example,
     * otherwise the popup will be blocked in most browsers.
     *
     * @param options
     * @param config
     */
    loginWithPopup(options?: PopupLoginOptions, config?: PopupConfigOptions): Promise<void>;
    /**
     * ```js
     * const user = await auth0.getUser();
     * ```
     *
     * Returns the user information if available (decoded
     * from the `id_token`).
     *
     * If you provide an audience or scope, they should match an existing Access Token
     * (the SDK stores a corresponding ID Token with every Access Token, and uses the
     * scope and audience to look up the ID Token)
     *
     * @typeparam TUser The type to return, has to extend {@link User}.
     * @param options
     */
    getUser<TUser extends User>(options?: GetUserOptions): Promise<TUser | undefined>;
    /**
     * ```js
     * const claims = await auth0.getIdTokenClaims();
     * ```
     *
     * Returns all claims from the id_token if available.
     *
     * If you provide an audience or scope, they should match an existing Access Token
     * (the SDK stores a corresponding ID Token with every Access Token, and uses the
     * scope and audience to look up the ID Token)
     *
     * @param options
     */
    getIdTokenClaims(options?: GetIdTokenClaimsOptions): Promise<IdToken>;
    /**
     * ```js
     * await auth0.loginWithRedirect(options);
     * ```
     *
     * Performs a redirect to `/authorize` using the parameters
     * provided as arguments. Random and secure `state` and `nonce`
     * parameters will be auto-generated.
     *
     * @param options
     */
    loginWithRedirect(options?: RedirectLoginOptions): Promise<void>;
    /**
     * After the browser redirects back to the callback page,
     * call `handleRedirectCallback` to handle success and error
     * responses from Auth0. If the response is successful, results
     * will be valid according to their expiration times.
     */
    handleRedirectCallback(url?: string): Promise<RedirectLoginResult>;
    /**
     * ```js
     * await auth0.checkSession();
     * ```
     *
     * Check if the user is logged in using `getTokenSilently`. The difference
     * with `getTokenSilently` is that this doesn't return a token, but it will
     * pre-fill the token cache.
     *
     * This method also heeds the `auth0.is.authenticated` cookie, as an optimization
     *  to prevent calling Auth0 unnecessarily. If the cookie is not present because
     * there was no previous login (or it has expired) then tokens will not be refreshed.
     *
     * It should be used for silently logging in the user when you instantiate the
     * `Auth0Client` constructor. You should not need this if you are using the
     * `createAuth0Client` factory.
     *
     * @param options
     */
    checkSession(options?: GetTokenSilentlyOptions): Promise<void>;
    /**
     * ```js
     * const token = await auth0.getTokenSilently(options);
     * ```
     *
     * If there's a valid token stored, return it. Otherwise, opens an
     * iframe with the `/authorize` URL using the parameters provided
     * as arguments. Random and secure `state` and `nonce` parameters
     * will be auto-generated. If the response is successful, results
     * will be valid according to their expiration times.
     *
     * If refresh tokens are used, the token endpoint is called directly with the
     * 'refresh_token' grant. If no refresh token is available to make this call,
     * the SDK falls back to using an iframe to the '/authorize' URL.
     *
     * This method may use a web worker to perform the token call if the in-memory
     * cache is used.
     *
     * If an `audience` value is given to this function, the SDK always falls
     * back to using an iframe to make the token exchange.
     *
     * Note that in all cases, falling back to an iframe requires access to
     * the `auth0` cookie.
     *
     * @param options
     */
    getTokenSilently(options?: GetTokenSilentlyOptions): Promise<any>;
    private _getTokenSilently;
    /**
     * ```js
     * const token = await auth0.getTokenWithPopup(options);
     * ```
     * Opens a popup with the `/authorize` URL using the parameters
     * provided as arguments. Random and secure `state` and `nonce`
     * parameters will be auto-generated. If the response is successful,
     * results will be valid according to their expiration times.
     *
     * @param options
     * @param config
     */
    getTokenWithPopup(options?: GetTokenWithPopupOptions, config?: PopupConfigOptions): Promise<string>;
    /**
     * ```js
     * const isAuthenticated = await auth0.isAuthenticated();
     * ```
     *
     * Returns `true` if there's valid information stored,
     * otherwise returns `false`.
     *
     */
    isAuthenticated(): Promise<boolean>;
    /**
     * ```js
     * await auth0.buildLogoutUrl(options);
     * ```
     *
     * Builds a URL to the logout endpoint using the parameters provided as arguments.
     * @param options
     */
    buildLogoutUrl(options?: LogoutUrlOptions): string;
    /**
     * ```js
     * auth0.logout();
     * ```
     *
     * Clears the application session and performs a redirect to `/v2/logout`, using
     * the parameters provided as arguments, to clear the Auth0 session.
     *
     * **Note:** If you are using a custom cache, and specifying `localOnly: true`, and you want to perform actions or read state from the SDK immediately after logout, you should `await` the result of calling `logout`.
     *
     * If the `federated` option is specified it also clears the Identity Provider session.
     * If the `localOnly` option is specified, it only clears the application session.
     * It is invalid to set both the `federated` and `localOnly` options to `true`,
     * and an error will be thrown if you do.
     * [Read more about how Logout works at Auth0](https://auth0.com/docs/logout).
     *
     * @param options
     */
    logout(options?: LogoutOptions): Promise<void> | void;
    private _getTokenFromIFrame;
    private _getTokenUsingRefreshToken;
}
