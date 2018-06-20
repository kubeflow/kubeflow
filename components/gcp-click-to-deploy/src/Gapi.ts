/// <reference path="../node_modules/@types/gapi/index.d.ts" />

export default class GapiManager {

  private _loadPromise: Promise<void>;
  // TODO(jlewi): ClientId for project cloud-ml-dev we should change this.
  private readonly CLIENT_ID = '236417448818-pksajgd0a6ghtjv3rlbvr7h9lo6uu17t.apps.googleusercontent.com';
  private readonly SCOPE = 'https://www.googleapis.com/auth/cloud-platform';
  private currentUser: gapi.auth2.GoogleUser; // Gets set by _loadClientId

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

  public async getSignedInEmail(): Promise<string> {
    await this.loadGapi();
    const user = await this._getCurrentUser();
    return user.getBasicProfile().getEmail();
  }

  public async loadSigninButton(): Promise<any> {
    await this.loadGapi();
    return this._loadPromise.then(() => new Promise((resolve, reject) => {
      gapi.load('signin2', { callback: resolve, onerror: (e: string) => reject(e) });
    })).then(() => gapi.signin2.render('loginButton', {
      height: 50,
      scope: this.SCOPE,
      width: 200,
    }));
  }

  public loadGapi(): Promise<void> {
    // Loads the gapi client library and the auth2 library together for efficiency.
    // Loading the auth2 library is optional here since `gapi.client.init` function will load
    // it if not already loaded. Loading it upfront can save one network request.
    if (!this._loadPromise) {
      this._loadPromise = new Promise((resolve, reject) =>
        gapi.load('client:auth2', { callback: resolve, onerror: (e: string) => reject(e) }))
        .then(() => this._loadClient());
    }

    return this._loadPromise;
  }

  private _loadClient(): Promise<void> {
    return gapi.auth2.init({
      client_id: this.CLIENT_ID,
      fetch_basic_profile: true,
      scope: this.SCOPE,
      ux_mode: 'popup',
    }).then(() => {
      this.currentUser = gapi.auth2.getAuthInstance().currentUser.get();
    }, (errorReason: any) => {
      throw new Error('Error in gapi auth: ' + errorReason.details);
    });
  }

  private async _getCurrentUser(): Promise<gapi.auth2.GoogleUser> {
    await this.loadGapi();
    return this.currentUser;
  }
}

