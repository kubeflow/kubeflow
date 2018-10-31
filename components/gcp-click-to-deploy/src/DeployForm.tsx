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
import * as request from 'request';
import Gapi from './Gapi';
import { flattenDeploymentOperationError, log, wait } from './Utils';

// TODO(jlewi): Can we fetch these directly from GitHub so we always get the latest value?
// When I tried using fetch API to do that I ran into errors that I interpreted as chrome blocking
// downloads from other domains from the one the app is being served at.
// So for security reasons it might be better to just bundle the configs.
// When we build a docker image as part of our release process we can just
// copy in the latest configs.
import appConfigPath from './user_config/app-config.yaml';

// TODO(jlewi): For the FQDN we should have a drop down box to select custom
// domain or automatically provisioned domain. Based on the response if the user
// selects auto domain then we should automatically supply the suffix
// <hostname>.endpoints.<Project>.cloud.goog

interface DeployFormState {
  deploymentName: string;
  dialogTitle: string;
  dialogBody: string;
  project: string;
  showLogs: boolean;
  zone: string;
  kfverison: string;
  clientId: string;
  clientSecret: string;
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

  private _configSpec: any;

  constructor(props: any) {
    super(props);
    this.state = {
      clientId: '',
      clientSecret: '',
      deploymentName: 'kubeflow',
      dialogBody: '',
      dialogTitle: '',
      kfverison: 'v0.3.1',
      project: '',
      showLogs: false,
      zone: 'us-central1-a',
    };
  }

  public async componentDidMount() {
    // Load the YAML and jinja templates
    // TODO(jlewi): The fetches should happen asynchronously. The user shouldn't
    // be able to click submit until the fetches have succeeded. How can we do
    // that?

    fetch(appConfigPath, { mode: 'no-cors' })
      .then((response) => {
        log('Got response');
        return response.text();
      })
      .then((text) => {
        this._configSpec = jsYaml.safeLoad(text);
        // log('Loaded clusterSpecPath successfully');
      })
      .catch((error) => {
        log('Request failed', error);
        this.setState({
          dialogBody: 'Failed to load user config file.',
          dialogTitle: 'Config loading Error',
        });
        return;
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
          <Input name="clientId" label="Web App Client Id" spellCheck={false} value={this.state.clientId} onChange={this._handleChange.bind(this)} />
        </Row>
        <Row>
          <Input name="clientSecret" label="Web App Client Secret" spellCheck={false} value={this.state.clientSecret} onChange={this._handleChange.bind(this)} />
        </Row>
        <Row>
          <Text style={{ fontSize: '1.1em', margin: '2% 11%' }}>GKE Zone: </Text>
          <select name="zone" style={{ display: 'flex', fontSize: '1.1em', margin: '2% 10.5%',}} spellCheck={false} value={this.state.zone} onChange={this._handleChange.bind(this)} >
            <option value="us-central1-a">us-central1-a</option>
            <option value="us-central1-c">us-central1-c</option>
            <option value="us-east1-c">us-east1-c</option>
            <option value="us-east1-d">us-east1-d</option>
            <option value="us-west1-b">us-west1-b</option>
            <option value="europe-west1-b">europe-west1-b</option>
            <option value="europe-west1-d">europe-west1-d</option>
            <option value="asia-east1-a">asia-east1-a</option>
            <option value="asia-east1-b">asia-east1-b</option>
          </select>
        </Row>
        <Row>
          <Text style={{ fontSize: '1.1em', margin: '2% 11%' }}>Kubeflow Version:</Text>
          <select name="kfverison" style={{ display: 'flex', fontSize: '1.1em', margin: '2% 1%',}} spellCheck={false} value={this.state.kfverison} onChange={this._handleChange.bind(this)} >
            <option value="v0.3.1">v0.3.1</option>
          </select>
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

    const state = this.state;
    const email = await Gapi.getSignedInEmail();

    this._configSpec.defaultApp.parameters.forEach((p: any) => {
      if (p.name === 'ipName') {
        p.value = this.state.deploymentName + '-ip';
      }

      if (p.name === 'hostname') {
        p.value = state.deploymentName + '.endpoints.' + state.project + '.cloud.goog';
      }

      if (p.name === 'acmeEmail') {
        p.value = email;
      }
    });
    this._configSpec.defaultApp.registries[0].version = this.state.kfverison;

    return this._configSpec;
  }

  // Create a  Kubeflow deployment.
  private async _createDeployment() {
    for (const prop of ['project', 'zone', 'deploymentName']) {
      if (this.state[prop] === '') {
        this.setState({
          dialogBody: 'Some required fields (project, zone, deploymentName) are missing',
          dialogTitle: 'Missing field',
        });
        return;
      }
    }
    const deploymentNameKey = 'deploymentName';
    if (this.state[deploymentNameKey].length < 4 || this.state[deploymentNameKey].length > 20) {
      this.setState({
        dialogBody: 'Deployment name length need to between 4 and 20',
        dialogTitle: 'Invalid field',
      });
      return;
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
    await request(
      {
        headers: { 'content-type': 'application/json' },
        method: 'GET',
        uri: this._configSpec.appAddress,
      },
      (error, response, body) => {
        if (error) {
          this._appendLine('Could not reach backend server, exiting');
          return;
        }
      }
    );

    let servicesToEnable: string[] = [];
    let enableAttempts = 0;
    const retryTimeout = 5000;
    const email = await Gapi.getSignedInEmail();
    do {
      servicesToEnable = await this._getServicesToEnable(project)
        .catch(e => {
          this.setState({
            dialogBody: `${email}: Error trying to list enabled services: ` + e,
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
            dialogBody: `${email}: Error trying to enable this required service: ` + s + '.\n' + e,
            dialogTitle: 'Deployment Error',
          }));
      }

      if (this.state.dialogTitle) {
        return;
      }

      enableAttempts++;
    } while (servicesToEnable.length && enableAttempts < 50);

    if (servicesToEnable.length && enableAttempts >= 50) {
      this.setState({
        dialogBody: 'Tried too many times to enable these services: ' +
          servicesToEnable.join(', '),
        dialogTitle: 'Deployment Error',
      });
      return;
    }

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
    const token = await Gapi.getToken();

    const deploymentName = this.state.deploymentName;

    const resource = await this._getYaml();
    if (!resource) {
      return;
    }

    const createBody = JSON.stringify(
      {
        AppConfig: this._configSpec.defaultApp,
        Apply: true,
        AutoConfigure: true,
        ClientId: btoa(this.state.clientId),
        ClientSecret: btoa(this.state.clientSecret),
        Cluster: deploymentName,
        Email: email,
        IpName: this.state.deploymentName + '-ip',
        Name: deploymentName,
        Namespace: 'kubeflow',
        Project: project,
        ProjectNumber: projectNumber,
        Token: token,
        Zone: this.state.zone,
      }
    );
    request(
      {
        body: createBody,
        headers: { 'content-type': 'application/json' },
        method: 'PUT',
        uri: this._configSpec.appAddress + '/kfctl/e2eDeploy',
      },
      (error, response, body) => {
        if (!error) {
          try {
            const err = JSON.parse(response.body).err;
            if (err) {
              this._appendLine('Deploy failed with backend error: ' + err);
            } else {
              this._appendLine('Deploy acknowledged by backend');
              this._monitorDeployment(project, deploymentName);
            }
          }
          catch (e) {
            this._appendLine('Backend returned non-json response: ' + body);
          }
        } else {
          this._appendLine('Error: ' + error);
        }
      }
    );
  }

  /**
   * Returns a list of services that are needed but not enabled for the given project.
   */
  private async _getServicesToEnable(project: string) {
    const enabledServices = await Gapi.servicemanagement.list(project);

    const servicesToEnable = new Set([
      'deploymentmanager.googleapis.com',
      'container.googleapis.com',
      'cloudresourcemanager.googleapis.com',
      'endpoints.googleapis.com',
      'iam.googleapis.com',
      'sourcerepo.googleapis.com',
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
          } else if (r.operation!.status! && r.operation!.status === 'DONE') {
            const readyTime = new Date();
            readyTime.setTime(readyTime.getTime() + (20 * 60 * 1000));
            this._appendLine('Deployment is done, your kubeflow app url should be ready within 20 minutes (by '
              + readyTime.toLocaleTimeString() + '): https://'
              + this.state.deploymentName + '.endpoints.' + this.state.project + '.cloud.goog');
            clearInterval(monitorInterval);
          } else {
            this._appendLine(`Status of ${deploymentName}: ` + r.operation!.status!);
          }
        })
        .catch(err => this._appendLine('deployment failed with error:' + err));
    }, 10000);
  }

  private _handleChange(event: Event) {
    const target = event.target as any;
    target.style.backgroundColor = !!target.value ? 'transparent' : '#fbecec';
    this.setState({
      [target.name]: target.value
    } as any);
  }

}
