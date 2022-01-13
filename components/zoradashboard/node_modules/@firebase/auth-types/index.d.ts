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

import { FirebaseApp, FirebaseNamespace } from '@firebase/app-types';
import { Observer, Unsubscribe } from '@firebase/util';

export interface User extends UserInfo {
  delete(): Promise<void>;
  emailVerified: boolean;
  getIdTokenResult(forceRefresh?: boolean): Promise<IdTokenResult>;
  getIdToken(forceRefresh?: boolean): Promise<string>;
  isAnonymous: boolean;
  linkAndRetrieveDataWithCredential(
    credential: AuthCredential
  ): Promise<UserCredential>;
  linkWithCredential(credential: AuthCredential): Promise<UserCredential>;
  linkWithPhoneNumber(
    phoneNumber: string,
    applicationVerifier: ApplicationVerifier
  ): Promise<ConfirmationResult>;
  linkWithPopup(provider: AuthProvider): Promise<UserCredential>;
  linkWithRedirect(provider: AuthProvider): Promise<void>;
  metadata: UserMetadata;
  multiFactor: MultiFactorUser;
  phoneNumber: string | null;
  providerData: (UserInfo | null)[];
  reauthenticateAndRetrieveDataWithCredential(
    credential: AuthCredential
  ): Promise<UserCredential>;
  reauthenticateWithCredential(
    credential: AuthCredential
  ): Promise<UserCredential>;
  reauthenticateWithPhoneNumber(
    phoneNumber: string,
    applicationVerifier: ApplicationVerifier
  ): Promise<ConfirmationResult>;
  reauthenticateWithPopup(provider: AuthProvider): Promise<UserCredential>;
  reauthenticateWithRedirect(provider: AuthProvider): Promise<void>;
  refreshToken: string;
  reload(): Promise<void>;
  sendEmailVerification(
    actionCodeSettings?: ActionCodeSettings | null
  ): Promise<void>;
  readonly tenantId: string | null;
  toJSON(): Object;
  unlink(providerId: string): Promise<User>;
  updateEmail(newEmail: string): Promise<void>;
  updatePassword(newPassword: string): Promise<void>;
  updatePhoneNumber(phoneCredential: AuthCredential): Promise<void>;
  updateProfile(profile: {
    displayName?: string | null;
    photoURL?: string | null;
  }): Promise<void>;
  verifyBeforeUpdateEmail(
    newEmail: string,
    actionCodeSettings?: ActionCodeSettings | null
  ): Promise<void>;
}

export interface UserInfo {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
}

export interface MultiFactorUser {
  enrolledFactors: MultiFactorInfo[];
  enroll(
    assertion: MultiFactorAssertion,
    displayName?: string | null
  ): Promise<void>;
  getSession(): Promise<MultiFactorSession>;
  unenroll(option: MultiFactorInfo | string): Promise<void>;
}

export class ActionCodeInfo {
  private constructor();
  data: {
    email?: string | null;
    fromEmail?: string | null;
    multiFactorInfo?: MultiFactorInfo | null;
    previousEmail?: string | null;
  };
  operation: string;
  static Operation: {
    PASSWORD_RESET: Operation;
    RECOVER_EMAIL: Operation;
    EMAIL_SIGNIN: Operation;
    REVERT_SECOND_FACTOR_ADDITION: Operation;
    VERIFY_AND_CHANGE_EMAIL: Operation;
    VERIFY_EMAIL: Operation;
  };
}

export class ActionCodeURL {
  private constructor();
  apiKey: string;
  code: string;
  continueUrl: string | null;
  languageCode: string | null;
  operation: Operation;
  static parseLink(link: string): ActionCodeURL | null;
  tenantId: string | null;
}

export type ActionCodeSettings = {
  android?: {
    installApp?: boolean;
    minimumVersion?: string;
    packageName: string;
  };
  handleCodeInApp?: boolean;
  iOS?: { bundleId: string };
  url: string;
  dynamicLinkDomain?: string;
};

export type AdditionalUserInfo = {
  isNewUser: boolean;
  profile: Object | null;
  providerId: string | null;
  username?: string | null;
};

export interface ApplicationVerifier {
  type: string;
  verify(): Promise<string>;
}

export abstract class AuthCredential {
  providerId: string;
  signInMethod: string;
  toJSON(): Object;
  static fromJSON(json: Object | string): AuthCredential | null;
}

export interface AuthProvider {
  providerId: string;
}

export interface ConfirmationResult {
  confirm(verificationCode: string): Promise<UserCredential>;
  verificationId: string;
}

export class EmailAuthProvider extends EmailAuthProvider_Instance {
  static PROVIDER_ID: string;
  static EMAIL_PASSWORD_SIGN_IN_METHOD: string;
  static EMAIL_LINK_SIGN_IN_METHOD: string;
  static credential(email: string, password: string): AuthCredential;
  static credentialWithLink(email: string, emailLink: string): AuthCredential;
}
export class EmailAuthProvider_Instance implements AuthProvider {
  providerId: string;
}

export interface Error {
  code: string;
  name: string;
  message: string;
  stack?: string;
}

export interface AuthError extends Error {
  credential?: AuthCredential;
  email?: string;
  phoneNumber?: string;
  tenantId?: string;
}

export interface MultiFactorError extends AuthError {
  resolver: MultiFactorResolver;
}

export class FacebookAuthProvider extends FacebookAuthProvider_Instance {
  static PROVIDER_ID: string;
  static FACEBOOK_SIGN_IN_METHOD: string;
  static credential(token: string): AuthCredential;
}
export class FacebookAuthProvider_Instance implements AuthProvider {
  addScope(scope: string): AuthProvider;
  providerId: string;
  setCustomParameters(customOAuthParameters: Object): AuthProvider;
}

export class GithubAuthProvider extends GithubAuthProvider_Instance {
  static PROVIDER_ID: string;
  static GITHUB_SIGN_IN_METHOD: string;
  static credential(token: string): AuthCredential;
}
export class GithubAuthProvider_Instance implements AuthProvider {
  addScope(scope: string): AuthProvider;
  providerId: string;
  setCustomParameters(customOAuthParameters: Object): AuthProvider;
}

export class GoogleAuthProvider extends GoogleAuthProvider_Instance {
  static PROVIDER_ID: string;
  static GOOGLE_SIGN_IN_METHOD: string;
  static credential(
    idToken?: string | null,
    accessToken?: string | null
  ): AuthCredential;
}
export class GoogleAuthProvider_Instance implements AuthProvider {
  addScope(scope: string): AuthProvider;
  providerId: string;
  setCustomParameters(customOAuthParameters: Object): AuthProvider;
}

export interface IdTokenResult {
  token: string;
  expirationTime: string;
  authTime: string;
  issuedAtTime: string;
  signInProvider: string | null;
  signInSecondFactor: string | null;
  claims: {
    [key: string]: any;
  };
}

export class OAuthProvider implements AuthProvider {
  constructor(providerId: string);
  providerId: string;
  addScope(scope: string): AuthProvider;
  credential(
    optionsOrIdToken: OAuthCredentialOptions | string | null,
    accessToken?: string
  ): OAuthCredential;
  setCustomParameters(customOAuthParameters: Object): AuthProvider;
}

export class SAMLAuthProvider implements AuthProvider {
  constructor(providerId: string);
  providerId: string;
}

export class PhoneAuthProvider extends PhoneAuthProvider_Instance {
  static PROVIDER_ID: string;
  static PHONE_SIGN_IN_METHOD: string;
  static credential(
    verificationId: string,
    verificationCode: string
  ): AuthCredential;
}
export class PhoneAuthProvider_Instance implements AuthProvider {
  constructor(auth?: FirebaseAuth | null);
  providerId: string;
  verifyPhoneNumber(
    phoneInfoOptions: PhoneInfoOptions | string,
    applicationVerifier: ApplicationVerifier
  ): Promise<string>;
}

export type PhoneInfoOptions =
  | PhoneSingleFactorInfoOptions
  | PhoneMultiFactorEnrollInfoOptions
  | PhoneMultiFactorSignInInfoOptions;

export interface PhoneSingleFactorInfoOptions {
  phoneNumber: string;
}

export interface PhoneMultiFactorEnrollInfoOptions {
  phoneNumber: string;
  session: MultiFactorSession;
}

export interface PhoneMultiFactorSignInInfoOptions {
  multiFactorHint?: MultiFactorInfo;
  multiFactorUid?: string;
  session: MultiFactorSession;
}

export class RecaptchaVerifier extends RecaptchaVerifier_Instance {}
export class RecaptchaVerifier_Instance implements ApplicationVerifier {
  constructor(
    container: any | string,
    parameters?: Object | null,
    app?: FirebaseApp | null
  );
  clear(): void;
  render(): Promise<number>;
  type: string;
  verify(): Promise<string>;
}

export class TwitterAuthProvider extends TwitterAuthProvider_Instance {
  static PROVIDER_ID: string;
  static TWITTER_SIGN_IN_METHOD: string;
  static credential(token: string, secret: string): AuthCredential;
}
export class TwitterAuthProvider_Instance implements AuthProvider {
  providerId: string;
  setCustomParameters(customOAuthParameters: Object): AuthProvider;
}

export type UserCredential = {
  additionalUserInfo?: AdditionalUserInfo | null;
  credential: AuthCredential | null;
  operationType?: string | null;
  user: User | null;
};

export interface UserMetadata {
  creationTime?: string;
  lastSignInTime?: string;
}

export type Persistence = string;

export type Operation = string;

export class OAuthCredential extends AuthCredential {
  private constructor();
  idToken?: string;
  accessToken?: string;
  secret?: string;
}

export interface OAuthCredentialOptions {
  idToken?: string;
  accessToken?: string;
  rawNonce?: string;
}

export class PhoneAuthCredential extends AuthCredential {
  private constructor();
}

export interface AuthSettings {
  appVerificationDisabledForTesting: boolean;
}

export class MultiFactorSession {
  private constructor();
}

export abstract class MultiFactorAssertion {
  factorId: string;
}

export class MultiFactorResolver {
  private constructor();
  auth: FirebaseAuth;
  session: MultiFactorSession;
  hints: MultiFactorInfo[];
  resolveSignIn(assertion: MultiFactorAssertion): Promise<UserCredential>;
}

export interface MultiFactorInfo {
  uid: string;
  displayName?: string | null;
  enrollmentTime: string;
  factorId: string;
}

export interface PhoneMultiFactorInfo extends MultiFactorInfo {
  phoneNumber: string;
}

export class PhoneMultiFactorAssertion extends MultiFactorAssertion {
  private constructor();
}

export class PhoneMultiFactorGenerator {
  private constructor();
  static FACTOR_ID: string;
  static assertion(
    phoneAuthCredential: PhoneAuthCredential
  ): PhoneMultiFactorAssertion;
}

export interface EmulatorConfig {
  readonly protocol: string;
  readonly host: string;
  readonly port: number | null;
  readonly options: {
    readonly disableWarnings: boolean;
  };
}

export class FirebaseAuth {
  private constructor();

  static Persistence: {
    LOCAL: Persistence;
    NONE: Persistence;
    SESSION: Persistence;
  };

  app: FirebaseApp;
  applyActionCode(code: string): Promise<void>;
  checkActionCode(code: string): Promise<ActionCodeInfo>;
  confirmPasswordReset(code: string, newPassword: string): Promise<void>;
  createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserCredential>;
  currentUser: User | null;
  readonly emulatorConfig: EmulatorConfig | null;
  fetchSignInMethodsForEmail(email: string): Promise<Array<string>>;
  isSignInWithEmailLink(emailLink: string): boolean;
  getRedirectResult(): Promise<UserCredential>;
  languageCode: string | null;
  settings: AuthSettings;
  onAuthStateChanged(
    nextOrObserver: Observer<any> | ((a: User | null) => any),
    error?: (a: Error) => any,
    completed?: Unsubscribe
  ): Unsubscribe;
  onIdTokenChanged(
    nextOrObserver: Observer<any> | ((a: User | null) => any),
    error?: (a: Error) => any,
    completed?: Unsubscribe
  ): Unsubscribe;
  sendSignInLinkToEmail(
    email: string,
    actionCodeSettings: ActionCodeSettings
  ): Promise<void>;
  sendPasswordResetEmail(
    email: string,
    actionCodeSettings?: ActionCodeSettings | null
  ): Promise<void>;
  setPersistence(persistence: Persistence): Promise<void>;
  signInAndRetrieveDataWithCredential(
    credential: AuthCredential
  ): Promise<UserCredential>;
  signInAnonymously(): Promise<UserCredential>;
  signInWithCredential(credential: AuthCredential): Promise<UserCredential>;
  signInWithCustomToken(token: string): Promise<UserCredential>;
  signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserCredential>;
  signInWithEmailLink(
    email: string,
    emailLink?: string
  ): Promise<UserCredential>;
  signInWithPhoneNumber(
    phoneNumber: string,
    applicationVerifier: ApplicationVerifier
  ): Promise<ConfirmationResult>;
  signInWithPopup(provider: AuthProvider): Promise<UserCredential>;
  signInWithRedirect(provider: AuthProvider): Promise<void>;
  signOut(): Promise<void>;
  tenantId: string | null;
  updateCurrentUser(user: User | null): Promise<void>;
  useDeviceLanguage(): void;
  useEmulator(url: string, options?: { disableWarnings?: boolean }): void;
  verifyPasswordResetCode(code: string): Promise<string>;
}

declare module '@firebase/app-types' {
  interface FirebaseNamespace {
    auth?: {
      (app?: FirebaseApp): FirebaseAuth;
      Auth: typeof FirebaseAuth;
      EmailAuthProvider: typeof EmailAuthProvider;
      EmailAuthProvider_Instance: typeof EmailAuthProvider_Instance;
      FacebookAuthProvider: typeof FacebookAuthProvider;
      FacebookAuthProvider_Instance: typeof FacebookAuthProvider_Instance;
      GithubAuthProvider: typeof GithubAuthProvider;
      GithubAuthProvider_Instance: typeof GithubAuthProvider_Instance;
      GoogleAuthProvider: typeof GoogleAuthProvider;
      GoogleAuthProvider_Instance: typeof GoogleAuthProvider_Instance;
      OAuthProvider: typeof OAuthProvider;
      SAMLAuthProvider: typeof SAMLAuthProvider;
      PhoneAuthProvider: typeof PhoneAuthProvider;
      PhoneAuthProvider_Instance: typeof PhoneAuthProvider_Instance;
      PhoneMultiFactorGenerator: typeof PhoneMultiFactorGenerator;
      RecaptchaVerifier: typeof RecaptchaVerifier;
      RecaptchaVerifier_Instance: typeof RecaptchaVerifier_Instance;
      TwitterAuthProvider: typeof TwitterAuthProvider;
      TwitterAuthProvider_Instance: typeof TwitterAuthProvider_Instance;
    };
  }
  interface FirebaseApp {
    auth?(): FirebaseAuth;
  }
}

declare module '@firebase/component' {
  interface NameServiceMapping {
    'auth': FirebaseAuth;
  }
}
