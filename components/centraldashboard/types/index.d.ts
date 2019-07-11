/**
 * Types used in the server.
 */

declare namespace User {
  export interface AuthObject {
    [authHeader: string]: string;
  }

  export interface User {
    email: string;
    username: string;
    domain: string;
    hasAuth: boolean;
    auth?: AuthObject;
  }
}

/** Extend the Express request with a User property */
declare namespace Express {
  export interface Request {
    user?: User.User
  }
}
