import { PopupConfigOptions } from './global';
/**
 * @ignore
 */
export declare const DEFAULT_AUTHORIZE_TIMEOUT_IN_SECONDS = 60;
/**
 * @ignore
 */
export declare const DEFAULT_POPUP_CONFIG_OPTIONS: PopupConfigOptions;
/**
 * @ignore
 */
export declare const DEFAULT_SILENT_TOKEN_RETRY_COUNT = 3;
/**
 * @ignore
 */
export declare const CLEANUP_IFRAME_TIMEOUT_IN_SECONDS = 2;
/**
 * @ignore
 */
export declare const DEFAULT_FETCH_TIMEOUT_MS = 10000;
export declare const CACHE_LOCATION_MEMORY = "memory";
export declare const CACHE_LOCATION_LOCAL_STORAGE = "localstorage";
/**
 * @ignore
 */
export declare const MISSING_REFRESH_TOKEN_ERROR_MESSAGE = "The web worker is missing the refresh token";
/**
 * @ignore
 */
export declare const INVALID_REFRESH_TOKEN_ERROR_MESSAGE = "invalid refresh token";
/**
 * @ignore
 */
export declare const DEFAULT_SCOPE = "openid profile email";
/**
 * A list of errors that can be issued by the authorization server which the
 * user can recover from by signing in interactively.
 * https://openid.net/specs/openid-connect-core-1_0.html#AuthError
 * @ignore
 */
export declare const RECOVERABLE_ERRORS: string[];
/**
 * @ignore
 */
export declare const DEFAULT_SESSION_CHECK_EXPIRY_DAYS = 1;
/**
 * @ignore
 */
export declare const DEFAULT_AUTH0_CLIENT: {
    name: string;
    version: string;
};
