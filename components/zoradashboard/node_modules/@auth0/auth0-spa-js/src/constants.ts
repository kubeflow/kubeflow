import { PopupConfigOptions } from './global';
import version from './version';

/**
 * @ignore
 */
export const DEFAULT_AUTHORIZE_TIMEOUT_IN_SECONDS = 60;

/**
 * @ignore
 */
export const DEFAULT_POPUP_CONFIG_OPTIONS: PopupConfigOptions = {
  timeoutInSeconds: DEFAULT_AUTHORIZE_TIMEOUT_IN_SECONDS
};

/**
 * @ignore
 */
export const DEFAULT_SILENT_TOKEN_RETRY_COUNT = 3;

/**
 * @ignore
 */
export const CLEANUP_IFRAME_TIMEOUT_IN_SECONDS = 2;

/**
 * @ignore
 */
export const DEFAULT_FETCH_TIMEOUT_MS = 10000;

export const CACHE_LOCATION_MEMORY = 'memory';
export const CACHE_LOCATION_LOCAL_STORAGE = 'localstorage';

/**
 * @ignore
 */
export const MISSING_REFRESH_TOKEN_ERROR_MESSAGE =
  'The web worker is missing the refresh token';

/**
 * @ignore
 */
export const INVALID_REFRESH_TOKEN_ERROR_MESSAGE = 'invalid refresh token';

/**
 * @ignore
 */
export const DEFAULT_SCOPE = 'openid profile email';

/**
 * A list of errors that can be issued by the authorization server which the
 * user can recover from by signing in interactively.
 * https://openid.net/specs/openid-connect-core-1_0.html#AuthError
 * @ignore
 */
export const RECOVERABLE_ERRORS = [
  'login_required',
  'consent_required',
  'interaction_required',
  'account_selection_required',
  // Strictly speaking the user can't recover from `access_denied` - but they
  // can get more information about their access being denied by logging in
  // interactively.
  'access_denied'
];

/**
 * @ignore
 */
export const DEFAULT_SESSION_CHECK_EXPIRY_DAYS = 1;

/**
 * @ignore
 */
export const DEFAULT_AUTH0_CLIENT = {
  name: 'auth0-spa-js',
  version: version
};
