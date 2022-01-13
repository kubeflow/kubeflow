/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { FirebaseAuthInternalName } from '@firebase/auth-interop-types';
import { Provider } from '@firebase/component';
import { User } from '../auth/user';
import { AsyncQueue } from '../util/async_queue';
export interface FirstPartyCredentialsSettings {
    ['type']: 'gapi';
    ['client']: unknown;
    ['sessionIndex']: string;
    ['iamToken']: string | null;
}
export interface ProviderCredentialsSettings {
    ['type']: 'provider';
    ['client']: CredentialsProvider;
}
/** Settings for private credentials */
export declare type CredentialsSettings = FirstPartyCredentialsSettings | ProviderCredentialsSettings;
export declare type TokenType = 'OAuth' | 'FirstParty';
export interface Token {
    /** Type of token. */
    type: TokenType;
    /**
     * The user with which the token is associated (used for persisting user
     * state on disk, etc.).
     */
    user: User;
    /** Extra header values to be passed along with a request */
    authHeaders: {
        [header: string]: string;
    };
}
export declare class OAuthToken implements Token {
    user: User;
    type: TokenType;
    authHeaders: {
        [header: string]: string;
    };
    constructor(value: string, user: User);
}
/**
 * A Listener for credential change events. The listener should fetch a new
 * token and may need to invalidate other state if the current user has also
 * changed.
 */
export declare type CredentialChangeListener = (user: User) => Promise<void>;
/**
 * Provides methods for getting the uid and token for the current user and
 * listening for changes.
 */
export interface CredentialsProvider {
    /** Requests a token for the current user. */
    getToken(): Promise<Token | null>;
    /**
     * Marks the last retrieved token as invalid, making the next GetToken request
     * force-refresh the token.
     */
    invalidateToken(): void;
    /**
     * Specifies a listener to be notified of credential changes
     * (sign-in / sign-out, token changes). It is immediately called once with the
     * initial user.
     *
     * The change listener is invoked on the provided AsyncQueue.
     */
    setChangeListener(asyncQueue: AsyncQueue, changeListener: CredentialChangeListener): void;
    /** Removes the previously-set change listener. */
    removeChangeListener(): void;
}
/** A CredentialsProvider that always yields an empty token. */
export declare class EmptyCredentialsProvider implements CredentialsProvider {
    /**
     * Stores the listener registered with setChangeListener()
     * This isn't actually necessary since the UID never changes, but we use this
     * to verify the listen contract is adhered to in tests.
     */
    private changeListener;
    getToken(): Promise<Token | null>;
    invalidateToken(): void;
    setChangeListener(asyncQueue: AsyncQueue, changeListener: CredentialChangeListener): void;
    removeChangeListener(): void;
}
/**
 * A CredentialsProvider that always returns a constant token. Used for
 * emulator token mocking.
 */
export declare class EmulatorCredentialsProvider implements CredentialsProvider {
    private token;
    constructor(token: Token);
    /**
     * Stores the listener registered with setChangeListener()
     * This isn't actually necessary since the UID never changes, but we use this
     * to verify the listen contract is adhered to in tests.
     */
    private changeListener;
    getToken(): Promise<Token | null>;
    invalidateToken(): void;
    setChangeListener(asyncQueue: AsyncQueue, changeListener: CredentialChangeListener): void;
    removeChangeListener(): void;
}
export declare class FirebaseCredentialsProvider implements CredentialsProvider {
    /**
     * The auth token listener registered with FirebaseApp, retained here so we
     * can unregister it.
     */
    private tokenListener;
    /** Tracks the current User. */
    private currentUser;
    /** Promise that allows blocking on the initialization of Firebase Auth. */
    private authDeferred;
    /**
     * Counter used to detect if the token changed while a getToken request was
     * outstanding.
     */
    private tokenCounter;
    /** The listener registered with setChangeListener(). */
    private changeListener?;
    private forceRefresh;
    private auth;
    private asyncQueue;
    constructor(authProvider: Provider<FirebaseAuthInternalName>);
    getToken(): Promise<Token | null>;
    invalidateToken(): void;
    setChangeListener(asyncQueue: AsyncQueue, changeListener: CredentialChangeListener): void;
    removeChangeListener(): void;
    private getUser;
}
interface Gapi {
    auth: {
        getAuthHeaderValueForFirstParty: (userIdentifiers: Array<{
            [key: string]: string;
        }>) => string | null;
    };
}
export declare class FirstPartyToken implements Token {
    private gapi;
    private sessionIndex;
    private iamToken;
    type: TokenType;
    user: User;
    constructor(gapi: Gapi, sessionIndex: string, iamToken: string | null);
    get authHeaders(): {
        [header: string]: string;
    };
}
export declare class FirstPartyCredentialsProvider implements CredentialsProvider {
    private gapi;
    private sessionIndex;
    private iamToken;
    constructor(gapi: Gapi, sessionIndex: string, iamToken: string | null);
    getToken(): Promise<Token | null>;
    setChangeListener(asyncQueue: AsyncQueue, changeListener: CredentialChangeListener): void;
    removeChangeListener(): void;
    invalidateToken(): void;
}
/**
 * Builds a CredentialsProvider depending on the type of
 * the credentials passed in.
 */
export declare function makeCredentialsProvider(credentials?: CredentialsSettings): CredentialsProvider;
export {};
