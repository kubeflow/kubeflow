import * as jsYaml from 'js-yaml';
import * as React from 'react';

// TODO(jlewi): Replace with official logo image. Also it would 
// be good to use a .svg or at least a high res image.
import logo from './logo.jpg';

// TODO(jlewi): Can we fetch these directly from GitHub so we always get the latest value?
// When I tried using fetch API to do that I ran into errors that I interpreted as chrome blocking
// downloads from other domains from the one the app is being served at.
// So for security reasons it might be better to just bundle the configs.
// When we build a docker image as part of our release process we can just
// copy in the latest configs.
import clusterSpecPath from './configs/cluster-kubeflow.yaml';
import clusterJinjaPath from './configs/cluster.jinja';

import './App.css';

import NameForm from './NameForm';

// TODO(jlewi): Can we set email automatically to the signed in email?
// TODO(jlewi): For the FQDN we should have a drop down box to select custom domain or automatically provisioned
// domain. Based on the response if the user selects auto domain then we should automatically supply the suffix
// <hostname>.endpoints.<Project>.cloud.goog

let auth2: any = null;

// TODO(jlewi): ClientId for project cloud-ml-dev we should change this.
const CLIENT_ID = '236417448818-pksajgd0a6ghtjv3rlbvr7h9lo6uu17t.apps.googleusercontent.com';

function log(...args: any[]) {
  // tslint:disable-next-line:no-console
  console.log(...args);
}

/**
 * Handler for when the sign-in state changes.
 *
 * @param {boolean} isSignedIn The new signed in state.
 */
const updateSignIn = () => {
  log('update sign in state');
  if (auth2.isSignedIn.get()) {
    log('signed in');
  } else {
    log('signed out');
  }
}

class SignInButton extends React.Component {
  public onSignIn(_: any) {
    // I want this method to be executed
  }

  public render() {
    return (
      // TODO(jlewi): How can we set data-onsuccess
      <div id='loginButton' className='g-signin2' data-theme='dark' />
    )
  }
}

interface AppState {
  clusterJinja: string;
  clusterSpec: any;
}

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      clusterJinja: '',
      clusterSpec: null,
    };
  }

  public getDeploymentTemplates() {
    return {
      clusterJinja: this.state.clusterJinja,
      clusterSpec: this.state.clusterSpec,
    };
  }

  // createClients  does the following
  // 1. Renders the sign in button
  // 2. Creates a client for the deployment manager.
  public createClients(gapi: any) {
    log('createClients called');

    // On load, called to load the auth2 library and API client library.
    gapi.load('signin2', () => log('Loaded signin2'));

    gapi.load('client:auth2', () => {
      // TODO(jlewi): Why do we load the client for deployment manager
      // when load of auth2 is done?
      gapi.client.load('deploymentmanager', 'v2').then(() => {
        log('Loaded deploymentmanager');
        // If we don't set a var = to this then we can't bind this in the
        // callback.

        log('load auth2');
        // See: https://developers.google.com/identity/sign-in/web/reference
        // Initializes the auth2 library.
        gapi.auth2.init({
          client_id: CLIENT_ID,
          fetch_basic_profile: false,
          scope: 'https://www.googleapis.com/auth/cloud-platform',
        }).then(() => {
          log('init');
          auth2 = gapi.auth2.getAuthInstance();
          auth2.isSignedIn.listen(updateSignIn);
          auth2.then(updateSignIn);
        });

        log('render button');
        gapi.signin2.render('loginButton', {
          // onSucess: updateSignIn,
          fetch_basic_profile: false,
          height: 50,
          scope: 'https://www.googleapis.com/auth/cloud-platform',
          width: 200,
        })

      }).catch((error: any) => {
        log('Error occured loading deployment manager: ' + error);
      });
    });
  }

  public initGapi(gapi: any) {
    log('Initializing GAPI...');
    log('Creating the google script tag...');
    this.createClients(gapi);
  }

  public componentDidMount() {
    window.addEventListener('gapiLoaded', (ev: CustomEvent) => this.initGapi(ev.detail));

    // Load the YAML and jinja templates
    // TODO(jlewi): The fetches should happen asynchronously.
    // The user shouldn't be able to click submit until
    // the fetches have succeeded. How can we do that?

    this.appendLine('loadClusterJinjaPath');
    // Load the jinja template into a string because 
    // we will need it for the deployments insert request.
    fetch(clusterJinjaPath, { mode: 'no-cors' })
      .then((response) => {
        log('Got response');
        return response.text();
      })
      .then((text) => {
        this.setState({
          clusterJinja: text,
        });
        log('Loaded clusterJinja successfully');
      })
      .catch((error) => {
        log('Request failed', error)
      });


    this.appendLine('loadClusterSpec');
    // Load the YAML for the actual config and parse it.
    fetch(clusterSpecPath, { mode: 'no-cors' })
      .then((response) => {
        log('Got response');
        return response.text();
      })
      .then((text) => {
        this.setState({
          clusterSpec: jsYaml.safeLoad(text),
        });
        // log('Loaded clusterSpecPath successfully');
      })
      .catch((error) => {
        log('Request failed', error)
      });

  }

  public appendLine(newLine: any) {
    const element = window.document.getElementById('logs') as HTMLInputElement;
    if (element == null) {
      log('Could not get logs element.');
      return
    }
    let currentValue = element.value;

    if (currentValue) {
      currentValue += '\n';
    }

    element.value = currentValue + newLine;
  }

  public render() {
    return (
      <div className='App' id='app'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
        </header>
        <SignInButton />
        <p className='App-intro'>
          To get started
            * Fill out the fields below
            * Click create deployment
        </p>
        {/* tslint:disable-next-line:jsx-no-lambda */}
        <NameForm className='nameForm' appendLine={(newline: any) => this.appendLine(newline)} getDeploymentTemplates={() => this.getDeploymentTemplates()} />
        <p> Logs </p>
        <textarea id='logs' data-width='800' data-height='800' />
      </div>
    );
  }
}

export default App;
