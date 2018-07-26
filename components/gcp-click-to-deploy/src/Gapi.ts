import { flattenDeploymentOperationError } from './Utils';

interface ManagedService {
  producerProjectId?: string;
  serviceName?: string;
}
interface ListServicesResponse {
  nextPageToken?: string;
  services?: ManagedService[];
}
interface EnableServiceRequest {
  consumerId?: string;
}

export default class Gapi {

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

  public static servicemanagement = class {

    public static async list(project: string) {
      await Gapi.load();
      const consumerId = encodeURIComponent(`project:${project}`);
      return gapi.client.request({
        path: `https://content-servicemanagement.googleapis.com/v1/services?consumerId=${consumerId}`,
      }).then(response => response.result as ListServicesResponse,
        badResult => {
          throw new Error('Errors listing services: ' + flattenDeploymentOperationError(badResult.result));
        });
    }

    public static async enable(project: string, serviceName: string) {
      await Gapi.load();
      const consumerId = `project:${project}`;
      return gapi.client.request({
        body: {
          consumerId
        },
        method: 'POST',
        path: `https://content-servicemanagement.googleapis.com/v1/services/${serviceName}:enable`,
      }).then(response => response.result as EnableServiceRequest,
        badResult => {
          throw new Error('Errors enabling service: ' + flattenDeploymentOperationError(badResult.result));
        });
    }

  };

  public static cloudresourcemanager = class {

    public static async getProjectNumber(projectId: string) {
      await Gapi.load();
      return gapi.client.request({
        path: `https://cloudresourcemanager.googleapis.com/v1/projects/${projectId}`
      }).then(response => (response.result as any).projectNumber as number,
        badResult => {
          throw new Error('Errors enabling service: ' + flattenDeploymentOperationError(badResult.result));
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
  private static readonly _CLIENT_ID = '236417448818-pksajgd0a6ghtjv3rlbvr7h9lo6uu17t.apps.googleusercontent.com';
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

