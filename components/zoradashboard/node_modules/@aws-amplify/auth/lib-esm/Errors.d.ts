import { AuthErrorMessages, AuthErrorTypes } from './types';
export declare class AuthError extends Error {
    log: string;
    constructor(type: AuthErrorTypes);
}
export declare class NoUserPoolError extends AuthError {
    constructor(type: AuthErrorTypes);
}
export declare const authErrorMessages: AuthErrorMessages;
