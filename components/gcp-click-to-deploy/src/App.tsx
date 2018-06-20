import * as jsYaml from 'js-yaml';
import * as React from 'react';
import Gapi from './Gapi';

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

declare global {
  interface Window {
    gapiPromise: Promise<any>;
  }
}

// TODO(jlewi): Can we set email automatically to the signed in email?
// TODO(jlewi): For the FQDN we should have a drop down box to select custom domain or automatically provisioned
// domain. Based on the response if the user selects auto domain then we should automatically supply the suffix
// <hostname>.endpoints.<Project>.cloud.goog

function log(...args: any[]) {
  // tslint:disable-next-line:no-console
  console.log(...args);
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

  public async componentDidMount() {
    const g = new Gapi();
    window.gapiPromise.then(async () => {
      log('gapi loaded');
      await g.loadGapi();
      // TODO: Hide this if the user is signed in, show the user's email instead.
      await g.loadSigninButton();
      log(await g.getSignedInEmail());
    });

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
