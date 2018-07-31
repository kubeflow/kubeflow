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
  deploymentName: string;
  dialogTitle: string;
  dialogBody: string;
  hostName: string;
  ipName: string;
  project: string;
  showLogs: boolean;
  zone: string;
}

const Text = glamorous.div({
  color: '#555',
  fontSize: 20,
  margin: '30px 60px',
});

const logsContainerStyle = (show: boolean) => {
  return {
    bottom: 0,
    height: show ? 120 : 0,
    left: 0,
    padding: 0,
    position: 'fixed',
    right: 0,
    transition: 'height 0.3s',
  } as React.CSSProperties;
};

const logsToggle: React.CSSProperties = {
  color: '#fff',
  fontWeight: 'bold',
  left: 20,
  position: 'absolute',
  top: -40,
};

const LogsArea = glamorous.textarea({
  backgroundColor: '#333',
  border: 0,
  boxSizing: 'border-box',
  color: '#bbb',
  fontFamily: 'Source Code Pro',
  fontSize: 15,
  height: '100%',
  padding: 20,
  width: '100%',
});

const Row = glamorous.div({
  display: 'flex',
  marginBottom: 12,
  minHeight: 56,
});

const Input = glamorous(TextField)({
  backgroundColor: '#f7f7f7',
  borderRadius: 4,
  color: '#666',
  margin: '0px 60px !important',
  width: '100%',
});

const DeployBtn = glamorous(Button)({
  marginRight: '20px !important',
  width: 180,
});

const YamlBtn = glamorous(Button)({
  width: 125,
});

export default class DeployForm extends React.Component<any, DeployFormState> {

  private _clusterJinja = '';
  private _clusterSpec: any;

  constructor(props: any) {
    super(props);
    this.state = {
      deploymentName: 'kubeflow',
      dialogBody: '',
      dialogTitle: '',
      hostName: '<HOST>.endpoints.<PROJECT>.cloud.goog',
      ipName: 'kubeflow',
      project: 'cloud-ml-dev',
      showLogs: false,
      zone: 'us-east1-d',
    };
  }

  public async componentDidMount() {
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
        this._clusterJinja = text;
        log('Loaded clusterJinja successfully');
      })
      .catch((error) => {
        log('Request failed', error);
      });

    this._appendLine('loadClusterSpec');
    // Load the YAML for the actual config and parse it.
    fetch(clusterSpecPath, { mode: 'no-cors' })
      .then((response) => {
        log('Got response');
        return response.text();
      })
      .then((text) => {
        this._clusterSpec = jsYaml.safeLoad(text);
        // log('Loaded clusterSpecPath successfully');
      })
      .catch((error) => {
        log('Request failed', error);
      });

  }

  public render() {
    return (
      <div>
        <Text>Create a Kubeflow deployment</Text>

        <Row>
          <Input name="project" label="Project" spellCheck={false} value={this.state.project} onChange={this._handleChange.bind(this)} />
        </Row>
        <Row>
          <Input name="deploymentName" label="Deployment name" spellCheck={false} value={this.state.deploymentName} onChange={this._handleChange.bind(this)} />
        </Row>
        <Row>
          <Input name="zone" label="Zone" spellCheck={false} value={this.state.zone} onChange={this._handleChange.bind(this)} />
        </Row>
        <Row>
          <Input name="ipName" label="IP name" spellCheck={false} value={this.state.ipName} onChange={this._handleChange.bind(this)} />
        </Row>
        <Row>
          <Input name="hostName" label="Hostname" spellCheck={false} value={this.state.hostName} onChange={this._handleChange.bind(this)} />
        </Row>

        <div style={{ display: 'flex', padding: '20px 60px 40px' }}>
          <DeployBtn variant="contained" color="primary" onClick={this._createDeployment.bind(this)}>
            Create Deployment
          </DeployBtn>

          <YamlBtn variant="outlined" color="default" onClick={this._showYaml.bind(this)}>
            View YAML
          </YamlBtn>
        </div>

        <div style={logsContainerStyle(this.state.showLogs)} >
          <Button style={logsToggle} onClick={this._toggleLogs.bind(this)} >
            {this.state.showLogs ? 'Hide ' : 'Show '} Logs
          </Button>
          <LogsArea id="logs" readOnly={true} />
        </div>

        <Dialog open={!!this.state.dialogTitle || !!this.state.dialogBody} keepMounted={true}
          onClose={() => this.setState({ dialogTitle: '', dialogBody: '' })}>
          <DialogTitle>
            {this.state.dialogTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.dialogBody}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ dialogTitle: '', dialogBody: '' })} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

      </div >
    );
  }

  private _toggleLogs() {
    this.setState({
      showLogs: !this.state.showLogs,
    });
  }

  private _appendLine(newLine: any) {
    const logsEl = document.querySelector('#logs') as HTMLInputElement;
    logsEl.value += (!!logsEl.value ? '\n' : '') + newLine;
    logsEl.scrollTop = logsEl.scrollHeight;
  }

  private async _showYaml() {
    const yaml = await this._getYaml();
    this.setState({
      dialogBody: JSON.stringify(yaml) || 'Error getting YAML',
      dialogTitle: yaml ? 'Deployment YAML' : 'Could not build deployment YAML',
    });
  }

  private async _getYaml() {
    if (!this.state.deploymentName) {
      this.setState({
        dialogBody: 'All fields are required, but it looks like you missed something.',
        dialogTitle: 'Missing field',
      });
      return;
    }

    const kubeflow = this._clusterSpec.resources[0];

    kubeflow.name = this.state.deploymentName;
    kubeflow.properties.zone = this.state.zone;

    const config: any = jsYaml.safeLoad(kubeflow.properties.bootstrapperConfig);

    if (config == null) {
      this.setState({
        dialogBody: 'Property bootstrapperConfig not found in deployment config.',
        dialogTitle: 'Deployment Error',
      });
      return;
    }

    const state = this.state;
    config.app.parameters.forEach((p: any) => {
      if (p.name === 'ipName') {
        p.value = state.ipName;
      }

      if (p.hostname === 'hostname') {
        p.value = state.hostName;
      }
    });

    this._clusterSpec.resources[0] = kubeflow;
    const clusterSpec = jsYaml.dump(this._clusterSpec);

    return {
      'name': this.state.deploymentName,
      'target': {
        'config': {
          'content': clusterSpec,
        },
        'imports': [
          {
            'content': this._clusterJinja,
            'name': 'cluster.jinja',
          }
        ],
      },
    };

  }

  // Create a  Kubeflow deployment.
  private async _createDeployment() {
    for (const prop of ['project', 'zone', 'ipName', 'deploymentName', 'hostName']) {
      if (this.state[prop] === '') {
        this.setState({
          dialogBody: 'All fields are required, but it looks like you missed something.',
          dialogTitle: 'Missing field',
        });
        return;
      }
    }

    this.setState({
      showLogs: true,
    });

    const project = this.state.project;

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
            dialogBody: 'Error trying to list enabled services: ' + e,
            dialogTitle: 'Deployment Error',
          });
          return [];
        });

      if (this.state.dialogTitle) {
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
            dialogBody: 'Error trying to enable this required service: ' + s + '.\n' + e,
            dialogTitle: 'Deployment Error',
          }));
      }

      if (this.state.dialogTitle) {
        return;
      }

      enableAttempts++;
    } while (servicesToEnable.length && enableAttempts < 5);

    if (servicesToEnable.length && enableAttempts >= 5) {
      this.setState({
        dialogBody: 'Tried too many times to enable these services: ' +
          servicesToEnable.join(', '),
        dialogTitle: 'Deployment Error',
      });
      return;
    }

    // Step 2: Set IAM Adming Policy
    const projectNumber = await Gapi.cloudresourcemanager.getProjectNumber(project)
      .catch(e => {
        this.setState({
          dialogBody: 'Error trying to get the project number: ' + e,
          dialogTitle: 'Deployment Error',
        });
        return undefined;
      });

    if (this.state.dialogTitle) {
      return;
    }

    this._appendLine('Proceeding with project number: ' + projectNumber);

    // Step 3: Create GCP Deployment

    const resource = await this._getYaml();
    if (!resource) {
      return;
    }

    this._appendLine('Starting new deployment..');

    const deploymentName = this.state.deploymentName;
    Gapi.deploymentmanager.insert(project, resource)
      .then(res => {
        this._appendLine('Result of create deployment operation:\n' + JSON.stringify(res));
        this._monitorDeployment(project, deploymentName);
      })
      .catch(err => {
        this._appendLine('Error trying to create deployment:\n' + err);
        this.setState({
          dialogBody: 'Error trying to create deployment: ' + err,
          dialogTitle: 'Deployment Error',
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
