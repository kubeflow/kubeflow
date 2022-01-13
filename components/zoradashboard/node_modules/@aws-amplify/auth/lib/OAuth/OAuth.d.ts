import { OAuthOpts, CognitoHostedUIIdentityProvider } from '../types/Auth';
export default class OAuth {
    private _urlOpener;
    private _config;
    private _cognitoClientId;
    private _scopes;
    constructor({ config, cognitoClientId, scopes, }: {
        scopes: string[];
        config: OAuthOpts;
        cognitoClientId: string;
    });
    private isValidScopes;
    oauthSignIn(responseType: string, domain: string, redirectSignIn: string, clientId: string, provider?: CognitoHostedUIIdentityProvider | string, customState?: string): void;
    private _handleCodeFlow;
    private _handleImplicitFlow;
    handleAuthResponse(currentUrl?: string): Promise<{
        state: string;
        accessToken: any;
        refreshToken: any;
        idToken: any;
    }>;
    private _validateState;
    signOut(): Promise<any>;
    private _generateState;
    private _generateChallenge;
    private _base64URL;
    private _generateRandom;
    private _bufferToString;
}
