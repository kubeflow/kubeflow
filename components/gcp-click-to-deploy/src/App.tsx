import * as jsYaml from 'js-yaml';
import * as React from 'react';
import Gapi from './Gapi';
import { log } from './Utils';

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

import glamorous from 'glamorous';
import DeployForm from './DeployForm';

declare global {
  interface Window {
    gapiPromise: Promise<any>;
  }
}

// TODO(jlewi): Can we set email automatically to the signed in email?
// TODO(jlewi): For the FQDN we should have a drop down box to select custom
// domain or automatically provisioned domain. Based on the response if the user
// selects auto domain then we should automatically supply the suffix
// <hostname>.endpoints.<Project>.cloud.goog

const Text = glamorous.div({
  margin: '10px 30px',
});

const LogsArea = glamorous.textarea({
  backgroundColor: '#333',
  boxSizing: 'border-box',
  color: '#fff',
  flexGrow: 1,
  fontSize: 13,
  height: 400,
  margin: '0 auto',
  padding: 5,
  width: '100%',
});

class SignInButton extends React.Component {
  public render() {
    return (
      <div id='loginButton' className='g-signin2' data-theme='dark' />
    )
  }
}

interface DeploymentTemplates {
  clusterJinja: string;
  clusterSpec: any;
}

class App extends React.Component<any, DeploymentTemplates> {

  constructor(props: any) {
    super(props);
    this.state = {
      clusterJinja: '',
      clusterSpec: null,
    };
  }

  public render() {
    return (
      <div className='App' id='app'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
        </header>
        <SignInButton />
        <br />
        <Text>To get started, fill out the fields below, then click create deployment.</Text>
        <DeployForm appendLine={this._appendLine.bind(this)}
          getDeploymentTemplates={this._getDeploymentTemplates.bind(this)} />
        <Text>Logs</Text>
        <LogsArea id='logs' readOnly={true} />
      </div>
    );
  }

  public async componentDidMount() {
    window.gapiPromise.then(async () => {
      log('gapi loaded');
      await Gapi.load();
      // TODO: Hide this if the user is signed in, show the user's email instead.
      const user = await Gapi.getSignedInEmail();
      if (user) {
        this._appendLine('Signed in as: ' + user);
      } else {
        await Gapi.loadSigninButton();
      }
    });

    // Load the YAML and jinja templates
    // TODO(jlewi): The fetches should happen asynchronously. The user shouldn't
    // be able to click submit until the fetches have succeeded. How can we do
    // that?

    this._appendLine('loadClusterJinjaPath');
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

    this._appendLine('loadClusterSpec');
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

  private _getDeploymentTemplates() {
    return {
      clusterJinja: this.state.clusterJinja,
      clusterSpec: this.state.clusterSpec,
    };
  }

  private _appendLine(newLine: any) {
    const logsEl = document.querySelector('#logs') as HTMLInputElement;
    logsEl.value += (!!logsEl.value ? '\n' : '') + newLine;
    logsEl.scrollTop = logsEl.scrollHeight;
  }

}

export default App;
