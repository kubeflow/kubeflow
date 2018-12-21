import * as rp from 'request-promise';
import { flattenDeploymentOperationError } from './Utils';

interface ManagedService {
  producerProjectId?: string;
  serviceName?: string;
}
interface ListServicesResponse {
  services?: ManagedService[];
}
interface EnableServiceRequest {
  consumerId?: string;
}

export default class Gapi {

  public static sautil = class {

    /**
     * Returns a list of services that are needed but not enabled for the given project.
     */
    public static async getServicesToEnable(project: string, token: string, enableAttempts: number) {
      const consumerId = encodeURIComponent(`project:${project}`);
      const enabledServices = await rp(
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json'
          },
          method: 'GET',
          uri: `https://servicemanagement.googleapis.com/v1/services?pageSize=100&consumerId=${consumerId}`,
        }
      ).then(
        response =>
          JSON.parse(response) as ListServicesResponse,
        badResult => {
          if (enableAttempts > 10) {
            throw new Error('Errors listing services: ' + badResult);
          } else {
            return [] as ListServicesResponse;
          }
        });

      const servicesToEnable = new Set([
        'deploymentmanager.googleapis.com',
        'container.googleapis.com',
        'cloudresourcemanager.googleapis.com',
        'endpoints.googleapis.com',
        'iam.googleapis.com',
        'sourcerepo.googleapis.com',
        'ml.googleapis.com',
        'file.googleapis.com',
        'sqladmin.googleapis.com',
      ]);

      if (enabledServices.services !== undefined) {
        for (const k of Array.from(servicesToEnable.keys())) {
          if (enabledServices!.services!.find(s => s.serviceName === k)) {
            servicesToEnable.delete(k);
          }
        }
      }

      return Array.from(servicesToEnable);
    }

    public static async enableServices(project: string, token: string, serviceName: string) {
      return rp(
        {
          body: JSON.stringify({ consumerId: `project:${project}` }),
          headers: {
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json'
          },
          method: 'POST',
          uri: `https://servicemanagement.googleapis.com/v1/services/${serviceName}:enable`,
        }
      ).then(response =>
          JSON.parse(response) as EnableServiceRequest,
        badResult => {
          throw new Error('Errors enabling service: ' + badResult);
        });
    }

  };

  public static deploymentmanager = class {

    public static async insert(project: string, resource: {}) {
      await this._load();
      return this._deploymentManager.insert({ project, resource } as any)
        .then(r => r.result, badResult => {
          throw new Error(
            'Errors creating new deployment: ' + flattenDeploymentOperationError(badResult.result));
        });
    }

    public static async get(project: string, deploymentName: string) {
      await this._load();
      return this._deploymentManager.get({ project, deployment: deploymentName })
        .then(r => r.result, badResult => {
          throw new Error(
            'Errors creating new deployment: ' + flattenDeploymentOperationError(badResult.result));
        });
    }

    private static _deploymentManager: gapi.client.deploymentmanager.DeploymentsResource;

    private static async _load() {
      await Gapi.load();
      return new Promise(resolve =>
        gapi.client.load('deploymentmanager', 'v2', () => resolve()))
        .then(() => {
          this._deploymentManager = (gapi.client as any).deploymentmanager.deployments;
        });
    }

  };

  public static cloudresourcemanager = class {

    public static async getProjectNumber(projectId: string) {
      await Gapi.load();
      return gapi.client.request({
        headers: {'X-Goog-User-Project': projectId},
        path: `https://cloudresourcemanager.googleapis.com/v1/projects/${projectId}`
      }).then(response => (response.result as any).projectNumber as number,
        badResult => {
          throw new Error('Error trying to get the project number: ' + JSON.stringify(badResult));
        });
    }

    public static async getIamPolicy(projectId: string) {
      await Gapi.load();
      return gapi.client.request({
        headers: {'X-Goog-User-Project': projectId},
        method: 'POST',
        path: `https://cloudresourcemanager.googleapis.com/v1/projects/${projectId}:getIamPolicy`
      }).then(response => response.result,
        badResult => {
          throw new Error('Error trying to get iam policy: ' + JSON.stringify(badResult));
        });
    }

    public static async setIamPolicy(projectId: string, policy: object) {
      await Gapi.load();
      return gapi.client.request({
        body: { 'policy': policy },
        headers: {'X-Goog-User-Project': projectId},
        method: 'POST',
        path: `https://cloudresourcemanager.googleapis.com/v1/projects/${projectId}:setIamPolicy`
      }).then(response => (response.result as any).bindings,
        badResult => {
          throw new Error('Error trying to set iam policy: ' + JSON.stringify(badResult));
        });
    }

  };

  public static iam = class {

    public static async getServiceAccountId(projectId: string, saEmail: string) {
      await Gapi.load();
      return gapi.client.request({
        headers: {'X-Goog-User-Project': projectId},
        path: `https://iam.googleapis.com/v1/projects/${projectId}/serviceAccounts/${saEmail}`
      }).then(response => (response.result as any).uniqueId,
        badResult => null);
    }

    public static async createServiceAccount(projectId: string, accountId: string) {
      await Gapi.load();
      return gapi.client.request({
        body: {
          'accountId': accountId,
          'serviceAccount': {
            'displayName': 'kubeflow service account'
          }
        },
        headers: {'X-Goog-User-Project': projectId},
        method: 'POST',
        path: `https://iam.googleapis.com/v1/projects/${projectId}/serviceAccounts`
      }).then(response => (response.result as any).uniqueId,
        badResult => {
          throw new Error('Error trying to create service account: ' + JSON.stringify(badResult));
        });
    }

    public static async getServiceAccountIAM(projectId: string, saEmail: string) {
      await Gapi.load();
      return gapi.client.request({
        headers: {'X-Goog-User-Project': projectId},
        method: 'POST',
        path: `https://iam.googleapis.com/v1/projects/${projectId}/serviceAccounts/${saEmail}:getIamPolicy`
      }).then(response => response.result,
        badResult => {
          throw new Error('Error trying to get service account iam policy: ' + JSON.stringify(badResult));
        });
    }

    public static async setServiceAccountIAM(projectId: string, saEmail: string, policy: object) {
      await Gapi.load();
      return gapi.client.request({
        body: { 'policy': policy },
        headers: {'X-Goog-User-Project': projectId},
        method: 'POST',
        path: `https://iam.googleapis.com/v1/projects/${projectId}/serviceAccounts/${saEmail}:setIamPolicy`
      }).then(response => (response.result as any).bindings,
        badResult => {
          throw new Error('Error trying to set service account iam policy: ' + JSON.stringify(badResult));
        });
    }

    public static async getServiceAccountToken(projectId: string, saEmail: string) {

      await Gapi.load();
      return gapi.client.request({
        body: {
          'delegates': [],
          'lifetime': '900s',
          'scope': [
            'https://www.googleapis.com/auth/cloud-platform'
          ]
        },
        headers: {'X-Goog-User-Project': projectId},
        method: 'POST',
        path: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${saEmail}:generateAccessToken`
      }).then(response =>
          (response.result as any).accessToken,
        badResult => {
          throw new Error('Error trying to generate service account token: ' + JSON.stringify(badResult));
        });
    }

  };

  public static async signIn(doPrompt?: boolean): Promise<void> {
    const rePromptOptions = 'login consent select_account';
    const promptFlags = doPrompt ? rePromptOptions : '';
    const options = {
      prompt: promptFlags,
    };
    await this.load();
    await gapi.auth2.getAuthInstance().signIn(options);
  }

  public static async signOut(): Promise<void> {
    return this.load()
      .then(() => gapi.auth2.getAuthInstance().signOut());
  }

  public static async getSignedInEmail(): Promise<string | null> {
    await this.load();
    const user = await this._getCurrentUser();
    return user ? user.getBasicProfile().getEmail() : null;
  }

  public static async loadSigninButton(buttonId: string): Promise<any> {
    await this.load();
    return this._loadPromise.then(() => new Promise((resolve, reject) => {
      gapi.load('signin2', { callback: resolve, onerror: (e: string) => reject(e) });
    })).then(() => gapi.signin2.render(buttonId, {
      height: 50,
      longtitle: true,
      scope: this._SCOPE,
      theme: 'dark',
      width: 250,
    }));
  }

  public static load(): Promise<void> {
    if (!this._loadPromise) {
      this._loadPromise = window.gapiPromise
        .then(() => new Promise((resolve, reject) =>
          gapi.load('client:auth2', { callback: resolve, onerror: (e: string) => reject(e) })))
        .then(() => this._loadClient());
    }

    return this._loadPromise;
  }

  public static async listenForSignInChanges(signInChangedCallback: (isSignedIn: boolean) => void):
    Promise<void> {
    await this.load();
    // Initialize the callback now
    signInChangedCallback(gapi.auth2.getAuthInstance().isSignedIn.get());

    // Listen for auth changes
    gapi.auth2.getAuthInstance().isSignedIn.listen(() => {
      signInChangedCallback(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  private static _loadPromise: Promise<void>;
  // TODO(jlewi): ClientId for project cloud-ml-dev we should change this.
  private static readonly _CLIENT_ID = '848270605882-24q1l9p37opq3i0ououumpts6rv5s0mb.apps.googleusercontent.com';
  private static readonly _SCOPE = 'https://www.googleapis.com/auth/cloud-platform';
  private static _currentUser: null | gapi.auth2.GoogleUser = null; // Gets set by _loadClientId

  private static async _updateSigninStatus() {
    await this.load();
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      this._currentUser = gapi.auth2.getAuthInstance().currentUser.get();
    } else {
      this._currentUser = null;
    }
  }

  private static _loadClient(): Promise<void> {
    return gapi.auth2.init({
      client_id: this._CLIENT_ID,
      fetch_basic_profile: true,
      scope: this._SCOPE,
      ux_mode: 'popup',
    }).then(() => {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.isSignedIn.listen(() => this._updateSigninStatus());
      auth2.then(() => this._updateSigninStatus());
    }, (errorReason: any) => {
      throw new Error('Error in gapi auth: ' + errorReason.details);
    });
  }

  private static async _getCurrentUser(): Promise<null | gapi.auth2.GoogleUser> {
    await this.load();
    return this._currentUser;
  }
}

