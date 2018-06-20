/// <reference path="../node_modules/@types/gapi/index.d.ts" />

export default class GapiManager {

  private _loadPromise: Promise<void>;
  // TODO(jlewi): ClientId for project cloud-ml-dev we should change this.
  private readonly _CLIENT_ID = '236417448818-pksajgd0a6ghtjv3rlbvr7h9lo6uu17t.apps.googleusercontent.com';
  private readonly _SCOPE = 'https://www.googleapis.com/auth/cloud-platform';
  private _currentUser: null | gapi.auth2.GoogleUser = null; // Gets set by _loadClientId

  public async signIn(doPrompt?: boolean): Promise<void> {
    const rePromptOptions = 'login consent select_account';
    const promptFlags = doPrompt ? rePromptOptions : '';
    const options = {
      prompt: promptFlags,
    };
    await this.loadGapi();
    await gapi.auth2.getAuthInstance().signIn(options);
  }

  public async signOut(): Promise<void> {
    return this.loadGapi()
      .then(() => gapi.auth2.getAuthInstance().signOut());
  }

  public async getSignedInEmail(): Promise<string | null> {
    await this.loadGapi();
    const user = await this._getCurrentUser();
    return user ? user.getBasicProfile().getEmail() : null;
  }

  public async loadSigninButton(): Promise<any> {
    await this.loadGapi();
    return this._loadPromise.then(() => new Promise((resolve, reject) => {
      gapi.load('signin2', { callback: resolve, onerror: (e: string) => reject(e) });
    })).then(() => gapi.signin2.render('loginButton', {
      height: 50,
      scope: this._SCOPE,
      width: 200,
    }));
  }

  public loadGapi(): Promise<void> {
    if (!this._loadPromise) {
      this._loadPromise = new Promise((resolve, reject) =>
        gapi.load('client:auth2', { callback: resolve, onerror: (e: string) => reject(e) }))
        .then(() => this._loadClient());
    }

    return this._loadPromise;
  }

  private async _updateSigninStatus() {
    await this.loadGapi();
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      this._currentUser = gapi.auth2.getAuthInstance().currentUser.get();
    } else {
      this._currentUser = null;
    }
  }

  private _loadClient(): Promise<void> {
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

  private async _getCurrentUser(): Promise<null | gapi.auth2.GoogleUser> {
    await this.loadGapi();
    return this._currentUser;
  }
}

