/**
 * Thrown when network requests to the Auth server fail.
 */
export class GenericError extends Error {
  constructor(public error: string, public error_description: string) {
    super(error_description);

    Object.setPrototypeOf(this, GenericError.prototype);
  }

  static fromPayload({
    error,
    error_description
  }: {
    error: string;
    error_description: string;
  }) {
    return new GenericError(error, error_description);
  }
}

/**
 * Thrown when handling the redirect callback fails, will be one of Auth0's
 * Authentication API's Standard Error Responses: https://auth0.com/docs/api/authentication?javascript#standard-error-responses
 */
export class AuthenticationError extends GenericError {
  constructor(
    error: string,
    error_description: string,
    public state: string,
    public appState: any = null
  ) {
    super(error, error_description);
    //https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

/**
 * Thrown when silent auth times out (usually due to a configuration issue) or
 * when network requests to the Auth server timeout.
 */
export class TimeoutError extends GenericError {
  constructor() {
    super('timeout', 'Timeout');
    //https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}

/**
 * Error thrown when the login popup times out (if the user does not complete auth)
 */
export class PopupTimeoutError extends TimeoutError {
  constructor(public popup: Window) {
    super();
    //https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, PopupTimeoutError.prototype);
  }
}

export class PopupCancelledError extends GenericError {
  constructor(public popup: Window) {
    super('cancelled', 'Popup closed');
    //https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, PopupCancelledError.prototype);
  }
}
