import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import glamorous from 'glamorous';
import * as jsYaml from 'js-yaml';
import * as React from 'react';
import Gapi from './Gapi';
import { flattenDeploymentOperationError, log, wait } from './Utils';

// TODO(jlewi): Can we fetch these directly from GitHub so we always get the latest value?
// When I tried using fetch API to do that I ran into errors that I interpreted as chrome blocking
// downloads from other domains from the one the app is being served at.
// So for security reasons it might be better to just bundle the configs.
// When we build a docker image as part of our release process we can just
// copy in the latest configs.
import clusterSpecPath from './configs/cluster-kubeflow.yaml';
import clusterJinjaPath from './configs/cluster.jinja';

// TODO(jlewi): For the FQDN we should have a drop down box to select custom
// domain or automatically provisioned domain. Based on the response if the user
// selects auto domain then we should automatically supply the suffix
// <hostname>.endpoints.<Project>.cloud.goog

interface DeployFormState {
  clusterJinja: string;
  clusterSpec: any;
  deploymentName: string;
  email: string;
  error: string;
  errorMessage: string;
  hostName: string;
  ipName: string;
  project: string;
  zone: string;
}

const Text = glamorous.div({
  color: '#555',
  margin: '30px',
});

const LogsArea = glamorous.textarea({
  backgroundColor: '#333',
  boxSizing: 'border-box',
  color: '#fff',
  flexGrow: 1,
  fontFamily: 'Source Code Pro',
  fontSize: 13,
  margin: '0 auto',
  maxWidth: 600,
  minHeight: 200,
  padding: 5,
  width: '100%',
});

const Row = glamorous.div({
  display: 'flex',
  marginBottom: 5,
  minHeight: 35,
});

const Label = glamorous.label({
  alignSelf: 'center',
  color: '#555',
  paddingLeft: 50,
  textAlign: 'left',
  width: 200,
});

const Input = glamorous(TextField)({
  backgroundColor: '#f7f7f7',
  borderRadius: 4,
  color: '#666',
  width: '50%',
});

const DeployBtn = glamorous(Button)({
  margin: '20px !important',
  width: 200,
});

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      containedPrimary: {
        fontWeight: 'inherit',
      },
    },
    MuiInput: {
      input: {
        fontSize: 15,
        height: 25,
        padding: 5,
      },
      underline: {
        '&:before': {
          borderBottom: '1px solid #ccc',
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: '1px solid #555',
        },
      },
    },
  },
});

export default class DeployForm extends React.Component<any, DeployFormState> {

  constructor(props: any) {
    super(props);
    this.state = {
      clusterJinja: '',
      clusterSpec: '',
      deploymentName: 'kubeflow',
      email: 'john@doe.com',
      error: '',
      errorMessage: '',
      hostName: '<HOST>.endpoints.<PROJECT>.cloud.goog',
      ipName: 'kubeflow',
      project: 'cloud-ml-dev',
      zone: 'us-east1-d',
    };
  }

  public async componentDidMount() {
    // Load the YAML and jinja templates
    // TODO(jlewi): The fetches should happen asynchronously. The user shouldn't
    // be able to click submit until the fetches have succeeded. How can we do
    // that?

    const email = await Gapi.getSignedInEmail();
    if (!email) {
      this.setState({
        error: 'You are not signed in',
        errorMessage: 'You must be signed in to use deploy Kubeflow to your GCP account.',
      });
      return;
    }

    this.setState({
      email,
    });

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

  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Text>To get started, fill out the fields below, then click create deployment.</Text>

        <Row>
          <Label>Project:</Label>
          <Input name='project' spellCheck={false} theme={theme} value={this.state.project} onChange={this._handleChange.bind(this)} />
        </Row>
        <Row>
          <Label>Deployment name:</Label>
          <Input name='deploymentName' spellCheck={false} value={this.state.deploymentName} onChange={this._handleChange.bind(this)} />
        </Row>
        <Row>
          <Label>Zone:</Label>
          <Input name='zone' spellCheck={false} value={this.state.zone} onChange={this._handleChange.bind(this)} />
        </Row>
        <Row>
          <Label>IP Name:</Label>
          <Input name='ipName' spellCheck={false} value={this.state.ipName} onChange={this._handleChange.bind(this)} />
        </Row>
        <Row>
          <Label>Hostname:</Label>
          <Input name='hostName' spellCheck={false} value={this.state.hostName} onChange={this._handleChange.bind(this)} />
        </Row>
        <Row>
          <Label>Email for Lets Encrypt:</Label>
          <Input name='email' spellCheck={false} value={this.state.email} onChange={this._handleChange.bind(this)} />
        </Row>

        <DeployBtn variant='contained' color='primary' onClick={this._createDeployment.bind(this)}>
          Create Deployment
        </DeployBtn>

        <Text>Logs</Text>
        <LogsArea id='logs' readOnly={true} />

        <Dialog open={!!this.state.error || !!this.state.errorMessage} keepMounted={true}
          onClose={() => this.setState({ error: '', errorMessage: '' })}>
          <DialogTitle>
            {this.state.error}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.errorMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ error: '', errorMessage: '' })} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

      </MuiThemeProvider >
    );
  }

  private _appendLine(newLine: any) {
    const logsEl = document.querySelector('#logs') as HTMLInputElement;
    logsEl.value += (!!logsEl.value ? '\n' : '') + newLine;
    logsEl.scrollTop = logsEl.scrollHeight;
  }

  // Create a  Kubeflow deployment.
  private async _createDeployment() {
    for (const prop of ['project', 'zone', 'email', 'ipName', 'deploymentName', 'hostName']) {
      if (this.state[prop] === '') {
        this.setState({
          error: 'Missing field',
          errorMessage: 'All fields are required, but it looks like you missed something.',
        });
        return;
      }
    }

    const kubeflow = this.state.clusterSpec.resources[0]

    kubeflow.name = this.state.deploymentName;
    kubeflow.properties.zone = this.state.zone;

    // Step 0: Load the bootstrapper config.
    const config: any = jsYaml.safeLoad(kubeflow.properties.bootstrapperConfig);

    if (config == null) {
      this.setState({
        error: 'Deployment Error',
        errorMessage: 'Property bootstrapperConfig not found in deployment config.',
      });
      return;
    }

    const state = this.state;
    config.app.parameters.forEach((p: any) => {
      if (p.name === 'acmeEmail') {
        p.value = state.email;
      }

      if (p.name === 'ipName') {
        p.value = state.ipName;
      }

      if (p.hostname === 'hostname') {
        p.value = state.hostName;
      }
    });

    this.state.clusterSpec.resources[0] = kubeflow;
    const yamlClusterSpec = jsYaml.dump(this.state.clusterSpec);
    this._appendLine('\n----------------\nNew deployment:');
    this._appendLine('Spec:\n' + jsYaml.dump(yamlClusterSpec));

    const project = this.state.project;
    const deploymentName = this.state.deploymentName;

    // Step 1: Enable required services
    // Enabling takes some time, so we get the list of services that need
    // enabling, make requests to enable them, then we repeat this in a loop
    // until we have no more services left, or we try too many times.
    this._appendLine(`Getting enabled services for project ${project}..`);

    let servicesToEnable: string[] = [];
    let enableAttempts = 0;
    const retryTimeout = 3000;
    do {
      servicesToEnable = await this._getServicesToEnable(project)
        .catch(e => {
          this.setState({
            error: 'Deployment Error',
            errorMessage: 'Error trying to list enabled services: ' + e,
          });
          return [];
        });

      if (this.state.error) {
        return;
      }

      if (servicesToEnable.length) {
        if (enableAttempts) {
          this._appendLine(`Retrying in ${retryTimeout / 1000} seconds`);
          await wait(retryTimeout);
        }

        this._appendLine(
          `Need to enable these services: ${servicesToEnable.join(', ')}..`);
      }

      for (const s of servicesToEnable) {
        this._appendLine('Enabling ' + s);
        await Gapi.servicemanagement.enable(project, s)
          .catch(e => this.setState({
            error: 'Deployment Error',
            errorMessage: 'Error trying to enable this required service: ' + s + '.\n' + e,
          }));
      }

      if (this.state.error) {
        return;
      }

      enableAttempts++;
    } while (servicesToEnable.length && enableAttempts < 5);

    if (servicesToEnable.length && enableAttempts >= 5) {
      this.setState({
        error: 'Deployment Error',
        errorMessage: 'Tried too many times to enable these services: ' +
          servicesToEnable.join(', '),
      });
      return;
    }

    // Step 2: Set IAM Adming Policy
    const projectNumber = await Gapi.cloudresourcemanager.getProjectNumber(project)
      .catch(e => {
        this.setState({
          error: 'Deployment Error',
          errorMessage: 'Error trying to get the project number: ' + e,
        });
        return undefined
      });

    if (this.state.error) {
      return;
    }

    this._appendLine('Proceeding with project number: ' + projectNumber);

    // Step 3: Create GCP Deployment

    const resource = {
      'name': deploymentName,
      'target': {
        'config': {
          'content': yamlClusterSpec,
        },
        'imports': [
          {
            'content': this.state.clusterJinja,
            'name': 'cluster.jinja',
          }
        ],
      },
    };

    Gapi.deploymentmanager.insert(project, resource)
      .then(res => {
        this._appendLine('Result of create deployment operation:\n' + JSON.stringify(res));
        this._monitorDeployment(project, deploymentName)
      })
      .catch(err => {
        this._appendLine('Error trying to create deployment:\n' + err);
        this.setState({
          error: 'Deployment Error',
          errorMessage: 'Error trying to create deployment: ' + err,
        });
      });

  }

  /**
   * Returns a list of services that are needed but not enabled for the given project.
   */
  private async _getServicesToEnable(project: string) {
    const enabledServices = await Gapi.servicemanagement.list(project);

    const servicesToEnable = new Set([
      'deploymentmanager.googleapis.com',
      'cloudresourcemanager.googleapis.com',
      'endpoints.googleapis.com',
      'iam.googleapis.com',
    ]);

    for (const k of Array.from(servicesToEnable.keys())) {
      if (enabledServices!.services!.find(s => s.serviceName === k)) {
        servicesToEnable.delete(k);
      }
    }

    return Array.from(servicesToEnable);
  }

  private _monitorDeployment(project: string, deploymentName: string) {
    const monitorInterval = setInterval(() => {
      Gapi.deploymentmanager.get(this.state.project, deploymentName)
        .then(r => {
          if (r.operation!.error && r.operation!.error!.errors!.length) {
            this._appendLine(
              'deployment failed with error:' + flattenDeploymentOperationError(r.operation!));
            clearInterval(monitorInterval);
          } else {
            this._appendLine(r.operation!.status!);
          }
        })
        .catch(err => this._appendLine('deployment failed with error:' + err));
    }, 3000);
  }

  private _handleChange(event: Event) {
    const target = event.target as any;
    target.style.backgroundColor = !!target.value ? 'transparent' : '#fbecec';
    this.setState({
      [target.name]: target.value
    } as any);
  }

}
