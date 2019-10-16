import {NextFunction, Request, RequestHandler, Response} from 'express';

/**
 * Returns a function that uses the provided header and prefix to extract
 * a User object with the requesting user's identity.
 */
export function attachUser(
    userIdHeader: string, userIdPrefix: string): RequestHandler {
  return (req: Request, _: Response, next: NextFunction) => {
    let email = 'anonymous@kubeflow.org';
    let auth: User.AuthObject;
    if (userIdHeader && req.header(userIdHeader)) {
      email = req.header(userIdHeader).slice(userIdPrefix.length);
      auth = {[userIdHeader]: email};
    }
    req.user = {
      email,
      username: email.split('@')[0],
      domain: email.split('@')[1],
      hasAuth: auth !== undefined,
      auth,
    };
    next();
  };
}
