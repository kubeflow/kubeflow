/// <reference path="../node_modules/@types/gapi/index.d.ts" />

enum GapiScopes {
  CLOUD,
  DRIVE,
  SIGNIN,
}
const initialScopes = [GapiScopes.SIGNIN, GapiScopes.CLOUD, GapiScopes.DRIVE];

export default class Gapi {

  private _loadPromise: Promise<void>;
  // TODO(jlewi): ClientId for project cloud-ml-dev we should change this.
  private readonly clientId = '236417448818-pksajgd0a6ghtjv3rlbvr7h9lo6uu17t.apps.googleusercontent.com';
  private currentUser: gapi.auth2.GoogleUser; // Gets set by _loadClientId

  public async signIn(doPrompt?: boolean): Promise<void> {
    const rePromptOptions = 'login consent select_account';
    const promptFlags = doPrompt ? rePromptOptions : '';
    const options = {
      prompt: promptFlags,
    };
    await this._loadGapi();
    await gapi.auth2.getAuthInstance().signIn(options);
  }

  public async signOut(): Promise<void> {
    return this._loadGapi()
      .then(() => gapi.auth2.getAuthInstance().signOut());
  }

  public async getSignedInEmail(): Promise<string> {
    await this._loadGapi();
    const user = await this._getCurrentUser();
    return user.getBasicProfile().getEmail();
  }

  public listenForSignInChanges(signInChangedCallback: (isSignedIn: boolean) => void):
    Promise<void> {
    return this._loadGapi()
      .then(() => {
        // Initialize the callback now
        signInChangedCallback(gapi.auth2.getAuthInstance().isSignedIn.get());

        // Listen for auth changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(() => {
          signInChangedCallback(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
      });
  }

  private _loadGapi(): Promise<void> {
    // Loads the gapi client library and the auth2 library together for efficiency.
    // Loading the auth2 library is optional here since `gapi.client.init` function will load
    // it if not already loaded. Loading it upfront can save one network request.
    if (!this._loadPromise) {
      this._loadPromise = new Promise((resolve, reject) =>
        gapi.load('client:auth2', { callback: resolve, onerror: (e: string) => reject(e) }))
        .then(() => this._initClient());
    }

    return this._loadPromise;
  }

  private _initClient(): Promise<void> {
    const initialScopeString = initialScopes.map(
      (scopeEnum) => this._getScopeString(scopeEnum)).join(' ');
    // TODO: Add state parameter to redirect the user back to the current URL
    // after the OAuth flow finishes.
    return gapi.auth2.init({
      client_id: this.clientId,
      fetch_basic_profile: true,
      scope: initialScopeString,
      ux_mode: 'popup',
    })
      // The return value of gapi.auth2.init is not a normal promise
      .then(() => {
        this.currentUser = gapi.auth2.getAuthInstance().currentUser.get();
      }, (errorReason: any) => {
        throw new Error('Error in gapi auth: ' + errorReason.details);
      });
  }

  private _getScopeString(scope: GapiScopes): string {
    // https://developers.google.com/identity/protocols/googlescopes
    switch (scope) {
      case GapiScopes.CLOUD:
        return 'https://www.googleapis.com/auth/cloud-platform';
      case GapiScopes.DRIVE:
        const driveScopeList = [
          'https://www.googleapis.com/auth/drive',
          'https://www.googleapis.com/auth/drive.appfolder',
          'https://www.googleapis.com/auth/drive.install',
        ];
        return driveScopeList.join(' ');
      case GapiScopes.SIGNIN:
        return 'profile email';
      default:
        throw new Error('Unknown gapi scope: ' + scope);
    }
  }

  private async _getCurrentUser(): Promise<gapi.auth2.GoogleUser> {
    await this._loadGapi();
    return this.currentUser;
  }
}

