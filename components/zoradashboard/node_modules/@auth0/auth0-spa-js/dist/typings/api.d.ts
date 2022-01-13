import { TokenEndpointOptions } from './global';
export declare type TokenEndpointResponse = {
    id_token: string;
    access_token: string;
    refresh_token?: string;
    expires_in: number;
    scope?: string;
};
export declare function oauthToken({ baseUrl, timeout, audience, scope, auth0Client, ...options }: TokenEndpointOptions, worker?: Worker): Promise<TokenEndpointResponse>;
