import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import * as jsYaml from 'js-yaml';
import * as React from 'react';
import * as request from 'request';

import Gapi from './Gapi';
import { encryptPassword, flattenDeploymentOperationError, log, wait } from './Utils';

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

const IngressType  = {
  BasicAuth: 'Login with Username Password',
  DeferIap: 'Setup Endpoint later',
  Iap: 'Login with GCP IAP'
};

interface DeployFormState {
  deploymentName: string;
  dialogTitle: string;
  dialogBody: string;
  project: string;
  showLogs: boolean;
  zone: string;
  kfctlLib: boolean;
  kfversion: string;
  kfversionList: string[];
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  password2: string;
  permanentStorage: boolean;
  ingress: string;
  spartakus: boolean;
}

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

const JUPYTER = 'jupyter';
const AMBASSADOR = 'ambassador';
const SPARTAKUS = 'spartakus';

const styles: { [key: string]: React.CSSProperties } = {
  btn: {
    marginRight: 20,
    width: 180,
  },
  input: {
    width: '100%',
  },
  logsArea: {
    backgroundColor: '#333',
    border: 0,
    boxSizing: 'border-box',
    color: '#bbb',
    fontFamily: 'Source Code Pro',
    fontSize: 15,
    height: '100%',
    padding: 20,
    width: '100%',
  },
  logsToggle: {
    color: '#fff',
    fontWeight: 'bold',
    left: 20,
    position: 'absolute',
    top: -40,
  },
  row: {
    display: 'flex',
    minHeight: 56,
    padding: '5px 50px',
  },
  text: {
    color: '#555',
    fontSize: 20,
    margin: '30px 60px',
  },
  yamlBtn: {
    width: 125,
  },
};

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
      ingress: IngressType.Iap,
      kfctlLib: false,
      kfversion: 'v0.5.0',
      // Version for local test. Staging and Prod with overwrite with their env vars.
      kfversionList: ['v0.5.0'],
      password: '',
      password2: '',
      permanentStorage: true,
      project: '',
      showLogs: false,
      spartakus: true,
      username: '',
      zone: 'us-central1-a',
    };
  }

  public async componentDidMount() {
    // Load the YAML and jinja templates
    // TODO(jlewi): The fetches should happen asynchronously. The user shouldn't
    // be able to click submit until the fetches have succeeded. How can we do
    // that?

    const params = new URLSearchParams(this.props.location.search);
    let kfversionList = this.state.kfversionList;
    let kfversion = this.state.kfversion;
    if (process.env.REACT_APP_VERSIONS){
      kfversionList = process.env.REACT_APP_VERSIONS.split(',');
      kfversion = kfversionList[0];
    }
    if (params.get('version')) {
      kfversion = String(params.get('version'));
      kfversionList.push(kfversion);
    }
    this.setState({
      kfversion,
      kfversionList,
    });
    if (params.get('kfctl')) {
      this.setState({
        kfctlLib: true
      });
    }
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
    const zoneList = ['us-central1-a', 'us-central1-c', 'us-east1-c', 'us-east1-d', 'us-west1-b',
      'europe-west1-b', 'europe-west1-d', 'asia-east1-a', 'asia-east1-b'];
    return (
      <div>
        <div style={styles.text}>Create a Kubeflow deployment</div>

        <div style={styles.row}>
          <TextField label="Project" spellCheck={false} style={styles.input} variant="filled"
            required={true} value={this.state.project} onChange={this._handleChange('project')} />
        </div>
        <div style={styles.row}>
          <TextField label="Deployment name" spellCheck={false} style={styles.input} variant="filled"
           required={true} value={this.state.deploymentName} onChange={this._handleChange('deploymentName')} />
        </div>
        <div style={styles.row}>
          <TextField select={true} label="Choose how to connect to kubeflow service:" required={true} style={styles.input} variant="filled"
                     value={this.state.ingress} onChange={this._handleChange('ingress')}>
            <MenuItem key={1} value={IngressType.Iap}>{IngressType.Iap}</MenuItem>
            <MenuItem key={2} value={IngressType.BasicAuth}>{IngressType.BasicAuth}</MenuItem>
            <MenuItem key={3} value={IngressType.DeferIap}>{IngressType.DeferIap}</MenuItem>
          </TextField>
        </div>

        <Collapse in={this.state.ingress === IngressType.Iap}>
          <div style={styles.row}>
            <li>An endpoint protected by GCP IAP will be created for accessing kubeflow.
              Follow these
              <a href="https://www.kubeflow.org/docs/gke/deploy/oauth-setup/"
                 style={{ color: 'inherit', marginLeft: 5 }}
                 target="_blank">
                instructions</a> to create an OAuth client and
                then enter as IAP Oauth Client ID and Secret</li>
          </div>
          <div style={styles.row}>
            <TextField label="IAP OAuth client ID" autoComplete="username" spellCheck={false} style={styles.input} variant="filled"
             required={true} value={this.state.clientId} onChange={this._handleChange('clientId')} />
          </div>
          <div style={styles.row}>
            <TextField label="IAP OAuth client secret" autoComplete="current-password" spellCheck={false} style={styles.input} variant="filled"
             required={true} value={this.state.clientSecret} onChange={this._handleChange('clientSecret')} />
          </div>
        </Collapse>

        <Collapse in={this.state.ingress === IngressType.BasicAuth}>
          <div style={styles.row}>
            <li>An endpoint protected by in-cluster auth will be created for accessing kubeflow.
              Create your username / password for login to kubeflow service</li>
          </div>
          <div style={styles.row}>
            <TextField label="Create Kubeflow Login Username" spellCheck={false} style={styles.input} variant="filled"
             required={true} value={this.state.username} onChange={this._handleChange('username')} />
          </div>
          <div style={styles.row}>
            <TextField label="Create Password" spellCheck={false} style={styles.input} variant="filled" type="password"
             required={true} value={this.state.password} onChange={this._handleChange('password')} />
          </div>
          <div style={styles.row}>
            <TextField label="Confirm Password" spellCheck={false} style={styles.input} variant="filled" type="password"
             required={true} value={this.state.password2} onChange={this._handleChange('password2')} />
          </div>
        </Collapse>

        <Collapse in={this.state.ingress === IngressType.DeferIap}>
          <div style={styles.row}>
            <li>Skip creating service endpoint now, finish endpoint setup later by inserting oauth client to kubeflow cluster</li>
          </div>
        </Collapse>

        <div style={styles.row}>
          <TextField select={true} label="GKE zone:" required={true} style={styles.input} variant="filled"
            value={this.state.zone} onChange={this._handleChange('zone')}>
            {zoneList.map((zone, i) => (
              <MenuItem key={i} value={zone}>{zone}</MenuItem>
            ))}
          </TextField>
        </div>

        <div style={styles.row}>
          <TextField select={true} label="Kubeflow version:" required={true} style={styles.input} variant="filled"
            value={this.state.kfversion} onChange={this._handleChange('kfversion')}>
            { this.state.kfversionList.map((version, i) => (
                <MenuItem key={i} value={version}>{version}</MenuItem>
              ))
            }
          </TextField>
        </div>
        <div style={styles.row}>
          <FormControlLabel label="Create Permanent Storage" control={
            <Checkbox checked={this.state.permanentStorage} color="primary"
                      onChange={() => this.setState({ permanentStorage: !this.state.permanentStorage })} />
          } />
          <FormControlLabel label="Share Anonymous Usage Report" control={
            <Checkbox checked={this.state.spartakus} color="primary"
                      onChange={() => this.setState({ spartakus: !this.state.spartakus })} />
          } />
        </div>

        <div style={{ display: 'flex', padding: '20px 60px 40px' }}>
          <Button style={styles.btn} variant="contained" color="primary" onClick={this._createDeployment.bind(this)}>
            Create Deployment
          </Button>

          {!(this.state.ingress === IngressType.DeferIap) && (
            <Button style={styles.btn} variant="contained" color="default" onClick={this._kubeflowAddress.bind(this)}>
              Kubeflow Service Endpoint
            </Button>
          )}
          {this.state.ingress === IngressType.DeferIap && (
            <Button style={styles.btn} variant="contained" color="default" onClick={this._toPortForward.bind(this)}>
              Port Forward
            </Button>
          )}

          <Button style={styles.yamlBtn} variant="outlined" color="default" onClick={this._showYaml.bind(this)}>
            View YAML
          </Button>
        </div>

        <div style={logsContainerStyle(this.state.showLogs)} >
          <Button style={styles.logsToggle} onClick={this._toggleLogs.bind(this)} >
            {this.state.showLogs ? 'Hide ' : 'Show '} Logs
          </Button>
          <textarea style={styles.logsArea} id="logs" readOnly={true} />
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

  private _currentTime() {
    const d = new Date();
    let timeStr = '';
    timeStr += d.getFullYear() + '-' + ('0' + d.getMonth()).slice(-2) + '-' + ('0' + d.getDate()).slice(-2) + ' ';
    timeStr += ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2) + '.' + ('00' + d.getMilliseconds()).slice(-3);
    timeStr += ': ';
    return timeStr;
  }

  private _appendLine(newLine: any) {
    const logsEl = document.querySelector('#logs') as HTMLInputElement;
    logsEl.value += (!!logsEl.value ? '\n' : '') + this._currentTime() + newLine;
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

    // Make copy of this._configSpec before conditional changes.
    const configSpec = JSON.parse(JSON.stringify(this._configSpec));
    configSpec.defaultApp.componentParams['cert-manager'][0].value = email;
    for (let i = 0, len = configSpec.defaultApp.componentParams['iap-ingress'].length; i < len; i++) {
      const p = configSpec.defaultApp.componentParams['iap-ingress'][i];
      if (p.name === 'ipName') {
        p.value = this.state.deploymentName + '-ip';
      }

      if (p.name === 'hostname') {
        p.value = state.deploymentName + '.endpoints.' + state.project + '.cloud.goog';
      }
    }

    // Customize config for v0.4.1 compatibility
    // TODO: remove after fully switch to kfctl / new deployment API is alive.
    if (this.state.kfversion.startsWith('v0.4.1')) {
      const removeComps = ['gpu-driver', 'notebook-controller'];
      for (let i = 0, len = removeComps.length; i < len; i++) {
        this._removeComponent(removeComps[i], configSpec);
      }
      for (let i = 0, len = configSpec.defaultApp.components.length; i < len; i++) {
        if (configSpec.defaultApp.components[i] === 'jupyter-web-app') {
          configSpec.defaultApp.components[i] = JUPYTER;
          break;
        }
      }
      configSpec.defaultApp.componentParams[JUPYTER] = [
        {
          initRequired: true,
          name: 'jupyterHubAuthenticator',
          value: 'iap'
        },
        {
          initRequired: true,
          name: 'platform',
          value: 'gke'
        }];
    }

    if (this.state.ingress === IngressType.BasicAuth) {
      for (let i = 0, len = configSpec.defaultApp.components.length; i < len; i++) {
        if (configSpec.defaultApp.components[i] === 'iap-ingress') {
          configSpec.defaultApp.components[i] = 'basic-auth-ingress';
          break;
        }
      }
      configSpec.defaultApp.componentParams['basic-auth-ingress'] =
        configSpec.defaultApp.componentParams['iap-ingress'];
      delete configSpec.defaultApp.componentParams['iap-ingress'];
      configSpec.defaultApp.components.push(
        'basic-auth',
      );
      configSpec.defaultApp.componentParams[AMBASSADOR] = [{
        initRequired: true,
        name: 'ambassadorServiceType',
        value: 'NodePort'
      }];
    }

    if (this.state.spartakus) {
      configSpec.defaultApp.components.push(SPARTAKUS);
      configSpec.defaultApp.componentParams[SPARTAKUS] = [{
        initRequired: true,
        name: 'usageId',
        value: Math.floor(Math.random() * 100000000).toString()
      },
      {
        initRequired: true,
        name: 'reportUsage',
        value: 'true'
      }];
    }
    return configSpec;
  }

  private _removeComponent(compName: string, configSpec: any) {
    let rmIdx = -1;
    for (let i = 0, len = configSpec.defaultApp.components.length; i < len; i++) {
      if (configSpec.defaultApp.components[i] === compName) {
        rmIdx = i;
        break;
      }
    }
    if (rmIdx !== -1) {
      configSpec.defaultApp.components.splice(rmIdx, 1);
    }
  }

  private async _toPortForward() {
    const key = 'project';
    if (this.state[key] === '') {
      this.setState({
        dialogBody: 'project id is missing',
        dialogTitle: 'Missing field',
      });
      return;
    }
    const cloudShellUrl = 'https://console.cloud.google.com/kubernetes/service/' +  this.state.zone + '/' +
      this.state.deploymentName + '/kubeflow/ambassador?project=' + this.state.project + '&tab=overview';
    window.open(cloudShellUrl, '_blank');
  }

  private async _kubeflowAddress() {
    for (const prop of ['project', 'deploymentName']) {
      if (this.state[prop] === '') {
        this.setState({
          dialogBody: 'Some required fields (project, deploymentName) are missing',
          dialogTitle: 'Missing field',
        });
        return;
      }
    }
    this.setState({
      showLogs: true,
    });
    const dashboardUri = 'https://' + this.state.deploymentName + '.endpoints.' + this.state.project + '.cloud.goog/';
    this._redirectToKFDashboard(dashboardUri);
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
    if (this.state.ingress === IngressType.Iap) {
      for (const prop of ['clientId', 'clientSecret']) {
        if (this.state[prop] === '') {
          this.setState({
            dialogBody: 'Some required fields (IAP Oauth Client ID, IAP Oauth Client Secret) are missing',
            dialogTitle: 'Missing field',
          });
          return;
        }
      }
    }
    if (this.state.ingress === IngressType.BasicAuth) {
      for (const prop of ['username', 'password', 'password2']) {
        if (this.state[prop] === '') {
          this.setState({
            dialogBody: 'Some required fields (username, password) are missing',
            dialogTitle: 'Missing field',
          });
          return;
        }
      }
      if (this.state.password !== this.state.password2) {
        this.setState({
          dialogBody: 'Two passwords does not match',
          dialogTitle: 'Passwords not match',
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
          this.setState({
            dialogTitle: 'Could not reach backend server, exiting',
          });
          return;
        }
      }
    );
    if (this.state.dialogTitle) {
      return;
    }

    const email = await Gapi.getSignedInEmail();

    // Create service account in target project, and use this sa's tmp token for all following actions.
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

    const deploymentName = this.state.deploymentName;
    const accountId =  'kubeflow-deploy-admin';
    const saEmail = accountId + '@' + project +'.iam.gserviceaccount.com';
    let saUniqueId = await Gapi.iam.getServiceAccountId(project, saEmail);
    if (saUniqueId === null) {
      saUniqueId = await Gapi.iam.createServiceAccount(project, accountId)
        .catch(e => {
          this.setState({
            dialogTitle: 'Failed creating Service Account in target project, please verify if have permission',
          });
        });
    }
    if (this.state.dialogTitle) {
      return;
    }

    const currProjPolicy = await Gapi.cloudresourcemanager.getIamPolicy(project);
    const bindingKey = 'bindings';
    currProjPolicy[bindingKey].push({
      'members': ['serviceAccount:' + saEmail],
      'role': 'roles/owner'
    });
    let returnPloicy = null;
    for (let retries = 5; retries > 0; retries -= 1) {
      returnPloicy = await Gapi.cloudresourcemanager.setIamPolicy(project, currProjPolicy)
        .catch(e => this._appendLine('Pending on project environment sync up'));
      if (returnPloicy !== undefined) {
        break;
      }
      await wait(10000);
    }
    if (returnPloicy === undefined) {
      this.setState({
        dialogTitle: 'Failed to set IAM policy, please make sure you have enough permissions.',
      });
      return;
    }

    const currSAPolicy = await Gapi.iam.getServiceAccountIAM(project, saEmail);
    if (!(bindingKey in currSAPolicy)) {
      currSAPolicy[bindingKey] = [];
    }
    currSAPolicy[bindingKey].push({
      'members': ['user:' + email],
      'role': 'roles/iam.serviceAccountTokenCreator'
    });
    await Gapi.iam.setServiceAccountIAM(project, saEmail, currSAPolicy)
      .catch(e => {
        this.setState({
          dialogTitle: 'Failed to set service account policy, please make sure you have enough permissions.',
        });
      });
    if (this.state.dialogTitle) {
      return;
    }

    let token = null;
    for (let retries = 20; retries > 0; retries -= 1) {
      token = await Gapi.iam.getServiceAccountToken(project, saEmail)
        .catch(e => this._appendLine('Pending on new service account policy sync up'));
      if (token !== undefined) {
        break;
      }
      await wait(10000);
    }
    if (token === undefined) {
      this.setState({
        dialogTitle: 'Failed to create service account token, please make sure you have enough permissions.',
      });
      return;
    }

    let servicesToEnable: string[] = [];
    let enableAttempts = 0;
    const retryTimeout = 5000;
    do {
      servicesToEnable = await Gapi.sautil.getServicesToEnable(project, token, enableAttempts)
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
        await Gapi.sautil.enableServices(project, token, s)
          .catch(e => this._appendLine('Pending on new service account token sync up'));
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

    if (this.state.dialogTitle) {
      return;
    }

    const configSpec = await this._getYaml();
    if (!configSpec) {
      return;
    }

    let createBody = {
      AppConfig: configSpec.defaultApp,
      Apply: true,
      AutoConfigure: true,
      Cluster: deploymentName,
      Email: email,
      IpName: this.state.deploymentName + '-ip',
      KfVersion: this.state.kfversion,
      Name: deploymentName,
      Namespace: 'kubeflow',
      Project: project,
      ProjectNumber: projectNumber,
      SAClientId: saUniqueId,
      Token: token,
      UseKfctl: this.state.kfctlLib,
      Zone: this.state.zone,
    };
    if (this.state.ingress === IngressType.Iap) {
      createBody = {...createBody, ...{
        ClientId: btoa(this.state.clientId),
        ClientSecret: btoa(this.state.clientSecret),
      }};
    }
    if (this.state.ingress === IngressType.BasicAuth) {
      createBody = {...createBody, ...{
        PasswordHash: btoa(encryptPassword(this.state.password)),
        Username: btoa(this.state.username),
      }};
    }
    if (this.state.permanentStorage) {
      createBody = {...createBody, ...{
          StorageOption: { CreatePipelinePersistentStorage: true },
        }};
    }
    request(
      {
        body: JSON.stringify(createBody),
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

  private _monitorDeployment(project: string, deploymentName: string) {
    const dashboardUri = 'https://' + this.state.deploymentName + '.endpoints.' + this.state.project + '.cloud.goog/';
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
            this._appendLine('Deployment initialized, configuring environment');
            this._appendLine('your kubeflow service url should be ready within 20 minutes (by '
              + readyTime.toLocaleTimeString() + '): https://'
              + this.state.deploymentName + '.endpoints.' + this.state.project + '.cloud.goog');
            this._redirectToKFDashboard(dashboardUri);
            clearInterval(monitorInterval);
          } else {
            this._appendLine(`${deploymentName}: Deployment Operation Status: ` + r.operation!.status!);
          }
        })
        .catch(err => this._appendLine('deployment failed with error:' + err));
    }, 10000);
  }

  private _redirectToKFDashboard(dashboardUri: string) {
    if (this.state.ingress === IngressType.Iap) {
      // relying on Kubeflow / JupyterHub logo image to be available when the site is ready.
      // The dashboard URI is hosted at a domain different from the deployer
      // app. Fetching a GET on the dashboard is blocked by the browser due
      // to CORS. Therefore we use an img element as a hack which fetches
      // an image served by the target site, the img load is a simple html
      // request and not an AJAX request, thus bypassing the CORS in this
      // case.
      this._appendLine('Validating if IAP is up and running...');
      const startTime = new Date().getTime() / 1000;
      const img = document.createElement('img');
      img.src = dashboardUri + 'assets/kf-logo_64px.svg' + '?rand=' + Math.random();
      img.id = 'ready_test';
      img.onload = () => {
        window.location.href = dashboardUri;
      };
      img.onerror = () => {
        const timeSince = (new Date().getTime() / 1000) - startTime;
        if (timeSince > 1500) {
          this._appendLine('Could not redirect to Kubeflow Dashboard at: ' + dashboardUri);
        } else {
          const ready_test = document.getElementById('ready_test') as HTMLImageElement;
          if (ready_test != null) {
            setTimeout(() => {
              // We rotate on image addresses of v0.4 and v0.5+ t to support both v0.4 and v0.5+
              if (ready_test.src.includes('hub/logo')) {
                ready_test.src = dashboardUri + 'assets/kf-logo_64px.svg' + '?rand=' + Math.random();
              } else {
                ready_test.src = dashboardUri + 'hub/logo' + '?rand=' + Math.random();
              }
              this._appendLine('Waiting for the IAP setup to get ready...');
            }, 10000);
          }
        }
      };
      img.style.display = 'none';
      document.body.appendChild(img);
    } else {
      if (this.state.ingress === IngressType.BasicAuth) {
        const loginUri = 'https://' + this.state.deploymentName + '.endpoints.' + this.state.project + '.cloud.goog/kflogin';
        const monitorInterval = setInterval(() => {
          request(
            {
              method: 'GET',
              uri: loginUri,
            },
            (error, response, body) => {
              if (!error) {
                clearInterval(monitorInterval);
                window.location.href = loginUri;
              } else {
                this._appendLine('Waiting for the kubeflow ingress to get ready...');
              }
            }
          );
        }, 10000);
      } else {
        this._appendLine('Please use port forward to connect to kubeflow when Skip Endpoint');
      }
    }
  }

  private _handleChange = (name: string) => (event: React.ChangeEvent) => {
    this.setState({
      [name]: (event.target as HTMLInputElement).value,
    } as any);
  }
}
