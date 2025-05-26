import {NextFunction, Request, RequestHandler, Response} from 'express';
import axios, { AxiosResponse } from 'axios';

interface KeycloakUser {
  id: string;
  name: string;
  // add other fields if you need them
}

const KEYCLOAK_BASE = 'http://role-iam-keycloak.keycloak.svc.cluster.local:80';
const REALM         = 'kubeflow-roles';
const ADMIN_USER    = 'admin';
const ADMIN_PASS    = 'DCNLab@2025';
const CLIENT_ID     = 'admin-cli';

interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  scope: string;
}

async function getAccessToken(): Promise<string> {
  const params = new URLSearchParams();
  params.append('username', ADMIN_USER);
  params.append('password', ADMIN_PASS);
  params.append('grant_type', 'password');
  params.append('client_id', CLIENT_ID);

  const resp = await axios.post<TokenResponse>(
    `${KEYCLOAK_BASE}/realms/master/protocol/openid-connect/token`,
    params.toString(),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  return resp.data.access_token;
}

async function getUserIdByEmail(token: string, email: string): Promise<string> {
  const resp: AxiosResponse<KeycloakUser[]> = await axios.get<KeycloakUser[]>(
    `${KEYCLOAK_BASE}/admin/realms/${REALM}/users`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { email }
    }
  );
  if (!resp.data.length) {
    throw new Error(`No user found for email ${email}`);
  }
  return resp.data[0].id;
}

async function getRealmRoles(token: string, userId: string): Promise<string[]> {
  const resp: AxiosResponse<KeycloakUser[]> = await axios.get<KeycloakUser[]>(
    `${KEYCLOAK_BASE}/admin/realms/${REALM}/users/${userId}/role-mappings/realm`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  // mỗi phần tử có dạng { id, name, description, ... }
  return resp.data.map(r => r.name);
}

/**
 * Returns a function that uses the provided header and prefix to extract
 * a User object with the requesting user's identity.
 */
export function attachUser(
    userIdHeader: string, userIdPrefix: string): RequestHandler {
  return async(req: Request, _: Response, next: NextFunction) => {
    let email = 'anonymous@kubeflow.org';
    let auth: User.AuthObject;
    let userrole = 'user';  // default to 'user'
    if (userIdHeader && req.header(userIdHeader)) {
      email = req.header(userIdHeader).slice(userIdPrefix.length);
      auth = {[userIdHeader]: req.header(userIdHeader)};

    // ← added: now that email is set, do our Keycloak lookup
    try {
      const token  = await getAccessToken();
      const userId = await getUserIdByEmail(token, email);
      const rolesArr  = await getRealmRoles(token, userId);
      const role = Array.isArray(rolesArr) ? rolesArr[0] : rolesArr;
      userrole = role;
    }
    catch (err) {
      userrole= 'user';
      }
  }
    req.user = {
      email,
      userrole,
      username: email.split('@')[0],
      domain: email.split('@')[1],
      hasAuth: auth !== undefined,
      auth,
    };
    next();
  };
}
