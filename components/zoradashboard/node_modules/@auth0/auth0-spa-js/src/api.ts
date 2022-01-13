import { TokenEndpointOptions } from './global';
import { DEFAULT_AUTH0_CLIENT } from './constants';
import { getJSON } from './http';

export type TokenEndpointResponse = {
  id_token: string;
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  scope?: string;
};

export async function oauthToken(
  {
    baseUrl,
    timeout,
    audience,
    scope,
    auth0Client,
    ...options
  }: TokenEndpointOptions,
  worker?: Worker
) {
  return await getJSON<TokenEndpointResponse>(
    `${baseUrl}/oauth/token`,
    timeout,
    audience || 'default',
    scope,
    {
      method: 'POST',
      body: JSON.stringify(options),
      headers: {
        'Content-type': 'application/json',
        'Auth0-Client': btoa(
          JSON.stringify(auth0Client || DEFAULT_AUTH0_CLIENT)
        )
      }
    },
    worker
  );
}
