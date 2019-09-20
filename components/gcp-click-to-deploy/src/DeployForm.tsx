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
import {
    encryptPassword, flattenDeploymentOperationError,
    getFileContentsFromGitHub, log, wait
} from './Utils';

/** Relative paths from the root of the repository. */
enum ConfigPath {
    V05 = 'v0.5-branch/components/gcp-click-to-deploy/app-config.yaml',
    V06 = 'a18d7b07/bootstrap/config/kfctl_gcp_iap.0.6.2.yaml'
}

/** Versions available for deployment. */
enum Version {
    V05 = 'v0.5.0',
    V06 = 'v0.6.2',
}

// TODO(jlewi): For the FQDN we should have a drop down box to select custom
// domain or automatically provisioned domain. Based on the response if the user
// selects auto domain then we should automatically supply the suffix
// <hostname>.endpoints.<Project>.cloud.goog

enum IngressType {
    BasicAuth = 'Login with Username Password',
    DeferIap = 'Setup Endpoint later',
    Iap = 'Login with GCP IAP'
}

interface DeployFormState {
    canSubmit: boolean;
    deploymentName: string;
    dialogTitle: string;
    dialogBody: string;
    dialogAsCode?: boolean;
    email: string;
    project: string;
    projectNumber: number;
    saClientId: string;
    saToken: string;
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

interface Secret {
    name: string;
    secretSource: {
        literalSource?: {value: string},
        hashedSource?: {value: string},
        envSource?: {name: string},
    };
}

interface Param {
    name: string;
    value: string;
    initRequired?: boolean;
}

interface KustomizeConfig {
    overlays: string[];
    repoRef: {name: string, path: string};
    parameters: Param[];
}

interface Application {
    name: string;
    kustomizeConfig: KustomizeConfig;
}

// From https://github.com/kubeflow/kubeflow/blob/master/bootstrap/pkg/apis/apps/kfdef/v1alpha1/application_types.go#L41
interface KfDefSpec {
    appdir?: string;
    applications: Application[];
    componentParams: {[name: string]: Param[]};
    components: string[];
    deleteStorage?: boolean;
    email?: string;
    enableApplications: boolean;
    hostname?: string;
    ipName?: string;
    mountLocal?: string;
    packageManager?: string;
    packages: string[];
    platform: string;
    plugins?: Array<{name: string, spec: any}>;
    project?: string;
    repos?: Array<{
        name: string;
        uri: string;
        root: string;
    }>;
    secrets?: Secret[];
    serverVersion?: string;
    skipInitProject?: boolean;
    useBasicAuth: boolean;
    useIstio: boolean;
    version?: string;
    zone?: string;
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

const ACCESS_TOKEN = 'accessToken';
const BASIC_AUTH = 'basic-auth-ingress';
const CERT_MANAGER = 'cert-manager';
const CLIENT_SECRET = 'CLIENT_SECRET';
const IAP_INGRESS = 'iap-ingress';
const ISTIO = 'istio';
const MINIO = 'minio';
const MYSQL = 'mysql';
const PASSWORD = 'password';
const PROFILES = 'profiles';
const SPARTAKUS = 'spartakus';
const nameformat = '[a-z]([-a-z0-9]*[a-z0-9])?';

const styles: {[key: string]: React.CSSProperties} = {
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
            canSubmit: false,
            clientId: '',
            clientSecret: '',
            deploymentName: 'kubeflow',
            dialogBody: '',
            dialogTitle: '',
            email: '',
            ingress: IngressType.Iap,
            kfctlLib: false,
            kfversion: Version.V06,
            // Version for local test. Staging and Prod with overwrite with their env vars.
            kfversionList: [Version.V06, Version.V05],
            password: '',
            password2: '',
            permanentStorage: true,
            project: '',
            projectNumber: -1,
            saClientId: '',
            saToken: '',
            showLogs: false,
            spartakus: true,
            username: '',
            zone: 'us-central1-a',
        };

        this._versionChanged = this._versionChanged.bind(this);
    }

    public async componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        let kfversionList = this.state.kfversionList;
        let kfversion = this.state.kfversion;
        if (process.env.REACT_APP_VERSIONS) {
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
        // By default, load the v0.6.0 specification
        this._loadConfigFile(ConfigPath.V06);
    }

    public render() {
        const zoneList = ['us-central1-a', 'us-central1-c', 'us-east1-c', 'us-east1-d', 'us-west1-b',
            'europe-west1-b', 'europe-west1-d', 'asia-east1-a', 'asia-east1-b'];
        const {kfversion} = this.state;
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
                    <TextField select={true} label="Choose how to connect to kubeflow service:"
                        required={true} style={styles.input} variant="filled"
                        value={this.state.ingress}
                        onChange={this._handleChange('ingress')}>
                        <MenuItem key={1} value={IngressType.Iap}>{IngressType.Iap}</MenuItem>
                        <MenuItem key={2} value={IngressType.BasicAuth}>{IngressType.BasicAuth}</MenuItem>
                        {kfversion !== Version.V06 &&
                            <MenuItem key={3} value={IngressType.DeferIap}>{IngressType.DeferIap}</MenuItem>
                        }
                    </TextField>
                </div>

                <Collapse in={this.state.ingress === IngressType.Iap}>
                    <div style={styles.row}>
                        <li>An endpoint protected by GCP IAP will be created for accessing kubeflow.
                          Follow these
              <a href="https://www.kubeflow.org/docs/gke/deploy/oauth-setup/"
                                style={{color: 'inherit', marginLeft: 5}}
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
                        value={this.state.kfversion} onChange={this._versionChanged}>
                        {this.state.kfversionList.map((version, i) => (
                            <MenuItem key={i} value={version}>{version}</MenuItem>
                        ))
                        }
                    </TextField>
                </div>
                <div style={styles.row}>
                    <FormControlLabel label="Share Anonymous Usage Report" control={
                        <Checkbox checked={this.state.spartakus} color="primary"
                            onChange={() => this.setState({spartakus: !this.state.spartakus})} />
                    } />
                </div>

                <div style={{display: 'flex', padding: '20px 60px 40px'}}>
                    <Button style={styles.btn} variant="contained" color="primary"
                        disabled={!this.state.canSubmit} onClick={this._createDeployment.bind(this)}>
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
                    onClose={() => this.setState({dialogTitle: '', dialogBody: ''})}>
                    <DialogTitle>
                        {this.state.dialogTitle}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText component={this.state.dialogAsCode ? 'pre' : 'p'}>
                            {this.state.dialogBody}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({dialogTitle: '', dialogBody: ''})} color="primary">
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
            dialogAsCode: true,
            dialogBody: JSON.stringify(yaml, undefined, 2) || 'Error getting YAML',
            dialogTitle: yaml ? 'Deployment YAML' : 'Could not build deployment YAML',
        });
    }

    private async _getYaml() {
        if (!this.state.deploymentName) {
            this.setState({
                dialogAsCode: false,
                dialogBody: 'All fields are required, but it looks like you missed something.',
                dialogTitle: 'Missing field',
            });
            return;
        }

        const email = await Gapi.getSignedInEmail() || '';
        this.setState({
            ['email']: email,
        });
        if (this.state.kfversion === Version.V06) {
            return this._getV6Yaml(email);
        } else {
            return this._getV5Yaml(email);
        }
    }

    private _getV5Yaml(email: string) {
        const state = this.state;
        for (let i = 0, len = this._configSpec.defaultApp.parameters.length; i < len; i++) {
            const p = this._configSpec.defaultApp.parameters[i];
            if (p.name === 'ipName') {
                p.value = this.state.deploymentName + '-ip';
            }

            if (p.name === 'hostname') {
                p.value = state.deploymentName + '.endpoints.' + state.project + '.cloud.goog';
            }

            if (p.name === 'acmeEmail') {
                p.value = email;
            }

        }
        this._configSpec.defaultApp.registries[0].version = this.state.kfversion;

        // Make copy of this._configSpec before conditional changes.
        const configSpec = JSON.parse(JSON.stringify(this._configSpec));

        // Customize config for v0.4.1 compatibility
        // TODO: remove after fully switch to kfctl / new deployment API is alive.
        if (this.state.kfversion.startsWith('v0.4.1')) {
            const removeComps = ['gcp-credentials-admission-webhook', 'gpu-driver', 'notebook-controller'];
            for (let i = 0, len = removeComps.length; i < len; i++) {
                this._removeComponent(removeComps[i], configSpec);
            }
            for (let i = 0, len = configSpec.defaultApp.components.length; i < len; i++) {
                const component = configSpec.defaultApp.components[i];
                if (component.name === 'jupyter-web-app') {
                    component.name = 'jupyter';
                    component.prototype = 'jupyter';
                    break;
                }
            }
            configSpec.defaultApp.parameters.push({
                component: 'jupyter',
                name: 'jupyterHubAuthenticator',
                value: 'iap'
            });
            configSpec.defaultApp.parameters.push({
                component: 'jupyter',
                name: 'platform',
                value: 'gke'
            });
        }

        if (this.state.ingress !== IngressType.Iap) {
            for (let i = 0, len = configSpec.defaultApp.components.length; i < len; i++) {
                const p = configSpec.defaultApp.components[i];
                if (p.name === 'iap-ingress') {
                    p.name = 'basic-auth-ingress';
                    p.prototype = 'basic-auth-ingress';
                }
            }
            for (let i = 0, len = configSpec.defaultApp.parameters.length; i < len; i++) {
                const p = configSpec.defaultApp.parameters[i];
                if (p.component === 'iap-ingress') {
                    p.component = 'basic-auth-ingress';
                }
                if (p.name === 'jupyterHubAuthenticator') {
                    p.value = 'null';
                }
            }
            configSpec.defaultApp.components.push({
                name: 'basic-auth',
                prototype: 'basic-auth',
            });
            configSpec.defaultApp.parameters.push({
                component: 'ambassador',
                name: 'ambassadorServiceType',
                value: 'NodePort'
            });
        }
        return configSpec;
    }

    private _getV6Yaml(email: string) {
        if (!this.state.deploymentName) {
            this.setState({
                dialogAsCode: false,
                dialogBody: 'All fields are required, but it looks like you missed something.',
                dialogTitle: 'Missing field',
            });
            return;
        }
        const state = this.state;
        // Make copy of this._configSpec before conditional changes replacing
        const configSpec = JSON.parse(JSON.stringify(this._configSpec));
        configSpec.metadata.name = this.state.deploymentName;
        delete configSpec.status;

        const appSpec = configSpec.spec as KfDefSpec;

        // Need to set applications and component parameters
        const apps = appSpec.applications
            .map((a): [string, Application] => [a.name, a]);
        const applicationsByName = new Map<string, Application>(apps);

        applicationsByName.get(CERT_MANAGER)!
            .kustomizeConfig.parameters[0].value = email;
        applicationsByName.get(PROFILES)!
            .kustomizeConfig.parameters[0].value = email;
        applicationsByName.get(MINIO)!
            .kustomizeConfig.parameters[0].value = this.state.deploymentName + '-storage-artifact-store';
        applicationsByName.get(MYSQL)!
            .kustomizeConfig.parameters[0].value = this.state.deploymentName + '-storage-metadata-store';

        appSpec.version = Version.V06;
        appSpec.useBasicAuth = this.state.ingress === IngressType.BasicAuth;
        appSpec.email = email;

        const iapIngress = applicationsByName.get(IAP_INGRESS)!;
        for (const p of iapIngress.kustomizeConfig.parameters) {
            if (p.name === 'ipName') {
                p.value = this.state.deploymentName + '-ip';
            } else if (p.name === 'hostname') {
                p.value = state.deploymentName + '.endpoints.' + state.project + '.cloud.goog';
            }
        }
        // Swap ingress types and add new application if basic auth
        if (this.state.ingress === IngressType.BasicAuth) {
            iapIngress.name = BASIC_AUTH;
            iapIngress.kustomizeConfig.repoRef.path = 'gcp/basic-auth-ingress';
            iapIngress.kustomizeConfig.parameters.push(
                {name: 'project', value: this.state.project, initRequired: true}
            );
            applicationsByName.get(ISTIO)!
                .kustomizeConfig.parameters[0].value = 'OFF';
            appSpec.applications.push({
                kustomizeConfig: {
                    overlays: [],
                    parameters: [],
                    repoRef: {name: 'manifests', path: 'common/basic-auth'},
                },
                name: 'basic-auth',
            });
            appSpec.applications.push({
                kustomizeConfig: {
                    overlays: [],
                    parameters: [
                        {name: 'ambassadorServiceType', value: 'NodePort'},
                        {name: 'namespace', value: 'istio-system'},
                    ],
                    repoRef: {name: 'manifests', path: 'common/ambassador'},
                },
                name: 'ambassador',
            });

        }

        const spartakus = applicationsByName.get(SPARTAKUS)!;
        for (const p of spartakus.kustomizeConfig.parameters) {
            if (p.name === 'usageId') {
                p.value = Math.floor(Math.random() * 100000000).toString();
            } else if (p.name === 'reportUsage') {
                p.value = String(this.state.spartakus);
            }
        }

        return configSpec;
    }

    private _removeComponent(compName: string, configSpec: any) {
        let rmIdx = -1;
        for (let i = 0, len = configSpec.defaultApp.components.length; i < len; i++) {
            const component = configSpec.defaultApp.components[i];
            if (component.name === compName) {
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
                dialogAsCode: false,
                dialogBody: 'project id is missing',
                dialogTitle: 'Missing field',
            });
            return;
        }
        const cloudShellUrl = 'https://console.cloud.google.com/kubernetes/service/' + this.state.zone + '/' +
            this.state.deploymentName + '/kubeflow/ambassador?project=' + this.state.project + '&tab=overview';
        window.open(cloudShellUrl, '_blank');
    }

    private async _kubeflowAddress() {
        for (const prop of ['project', 'deploymentName']) {
            if (this.state[prop] === '') {
                this.setState({
                    dialogAsCode: false,
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
        try {
            this._validateInputFields();
        } catch (err) {return;}

        this.setState({
            showLogs: true,
        });

        // Step 1: Enable all necessary GCP services
        try {
            await this._enableGcpServices();
        } catch (err) {
            this._appendLine(
                'Could not configure communication with GCP, exiting');
            return;
        }

        // Step 2: Submit the configuration to the backend service
        const configSpec = await this._getYaml();
        if (!configSpec) {
            return;
        }

        let buildEndpoint: string;
        let requestBody: string;
        if (this.state.kfversion === Version.V05) {
            // buildEndpoint = `${this._configSpec.appAddress}/kfctl/e2eDeploy`;
            buildEndpoint = '/kfctl/e2eDeploy';
            requestBody = this._getV5BuildRequest(configSpec);
        } else {
            buildEndpoint = '/kfctl/apps/v1alpha2/create';
            requestBody = this._getV6BuildRequest(configSpec);
        }

        try {
            const response = await fetch(buildEndpoint, {
                body: requestBody,
                headers: {'content-type': 'application/json'},
                method: 'PUT',
            }
            );
            if (response.status !== 200) {
                throw new Error(`Backend response with error status: ${response.status}`);
            }

            const body = await response.json();
            if (body.err) {
                this._appendLine(`Deploy failed with backend error: ${body.err}`);
                throw new Error(body.err);
            }

            this._appendLine('Deploy acknowledged by backend');
            this._monitorDeployment(this.state.project,
                this.state.deploymentName);
        } catch (err) {
            this._appendLine('Error: ' + err);
            this.setState({
                dialogAsCode: false,
                dialogBody:
                    'There was an error submitting your deploy request. See logs below.',
                dialogTitle: 'Unable to Deploy',
            });
        }
    }

    private _monitorDeployment(project: string, deploymentName: string) {
        const dashboardUri = 'https://' + this.state.deploymentName + '.endpoints.' + this.state.project + '.cloud.goog/';
        const monitorInterval = setInterval(() => {
            Gapi.deploymentmanager.get(this.state.project, deploymentName)
                .then(r => {
                    if (r.operation!.error && r.operation!.error!.errors!.length) {
                        this._appendLine(
                            'Deployment status: ' + flattenDeploymentOperationError(r.operation!));
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
                .catch(err => this._appendLine('Deployment status: operation pending.'));
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
            img.src = dashboardUri + 'assets/favicon-32x32.png' + '?rand=' + Math.random();
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
                            // We rotate on image addresses of v0.6 and v0.5 to support both of them.
                            if (ready_test.src.includes('favicon')) {
                                ready_test.src = dashboardUri + 'assets/kf-logo_64px.svg' + '?rand=' + Math.random();
                            } else {
                                ready_test.src = dashboardUri + 'assets/favicon-32x32.png' + '?rand=' + Math.random();
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

    /**
     * Helper method to validate necessary input fields.
     * @throws Error on any invalid condition
     */
    private _validateInputFields(): void {
        const err = new Error('Invalid inputs');
        for (const prop of ['project', 'zone', 'deploymentName']) {
            if (this.state[prop] === '') {
                this.setState({
                    dialogAsCode: false,
                    dialogBody: 'Some required fields (project, zone, deploymentName) are missing',
                    dialogTitle: 'Missing field',
                });
                throw err;
            }
        }
        if (this.state.ingress === IngressType.Iap) {
            for (const prop of ['clientId', 'clientSecret']) {
                if (this.state[prop] === '') {
                    this.setState({
                        dialogAsCode: false,
                        dialogBody: 'Some required fields (IAP Oauth Client ID, IAP Oauth Client Secret) are missing',
                        dialogTitle: 'Missing field',
                    });
                    throw err;
                }
            }
        }
        if (this.state.ingress === IngressType.BasicAuth) {
            for (const prop of ['username', 'password', 'password2']) {
                if (this.state[prop] === '') {
                    this.setState({
                        dialogAsCode: false,
                        dialogBody: 'Some required fields (username, password) are missing',
                        dialogTitle: 'Missing field',
                    });
                    throw err;
                }
            }
            if (this.state.password !== this.state.password2) {
                this.setState({
                    dialogAsCode: false,
                    dialogBody: 'Two passwords does not match',
                    dialogTitle: 'Passwords not match',
                });
                throw err;
            }
        }
        const deploymentNameKey = 'deploymentName';
        if (this.state[deploymentNameKey].length < 4 || this.state[deploymentNameKey].length > 20) {
            this.setState({
                dialogAsCode: false,
                dialogBody: 'Deployment name length need to between 4 and 20',
                dialogTitle: 'Invalid field',
            });
            throw err;
        }
        const filtered = this.state[deploymentNameKey].match(nameformat);
        if (!(filtered && this.state[deploymentNameKey] === filtered[0])) {
            this.setState({
                dialogAsCode: false,
                dialogBody: 'Deployment name: the first character must be a lowercase letter, and all following ' +
                  'characters must be a dash, lowercase letter, or digit, except the last character, ' +
                  'which cannot be a dash',
                dialogTitle: 'Invalid field',
            });
            throw err;
        }
    }

    /**
     * Helper method to enable necessary GCP services to build the deployment.
     * @throws Error on any invalid condition
     */
    private async _enableGcpServices(): Promise<void> {
        const {project} = this.state;
        // Step 1: Enable required services
        // Enabling takes some time, so we get the list of services that need
        // enabling, make requests to enable them, then we repeat this in a loop
        // until we have no more services left, or we try too many times.
        this._appendLine(`Getting enabled services for project ${project}..`);
        const email = await Gapi.getSignedInEmail();

        // Create service account in target project, and use this sa's tmp token for all following actions.
        let projectNumber: number;
        try {
            projectNumber = await Gapi.cloudresourcemanager
                .getProjectNumber(project);
            this.setState({projectNumber});
        } catch (err) {
            this.setState({
                dialogAsCode: false,
                dialogBody: `Error trying to get the project number: ${err}`,
                dialogTitle: 'Deployment Error',
            });
            throw err;
        }

        this._appendLine('Proceeding with project number: ' + projectNumber);

        const accountId = 'kubeflow-deploy-admin';
        const saEmail = accountId + '@' + project + '.iam.gserviceaccount.com';
        let saClientId: string;
        try {
            saClientId = await Gapi.iam.getServiceAccountId(project, saEmail);
            if (saClientId === null) {
                saClientId = await Gapi.iam
                    .createServiceAccount(project, accountId);
            }
            this.setState({saClientId});
        } catch (err) {
            this.setState({
                dialogAsCode: false,
                dialogBody: 'Failed creating Service Account in target project, please verify if have permission',
                dialogTitle: 'Unable to obtain Service Account'
            });
            throw err;
        }

        const currProjPolicy = await Gapi.cloudresourcemanager.getIamPolicy(project);
        const bindingKey = 'bindings';
        currProjPolicy[bindingKey].push({
            'members': ['serviceAccount:' + saEmail],
            'role': 'roles/owner'
        });
        let returnPolicy = null;
        for (let retries = 5; retries > 0; retries -= 1) {
            try {
                returnPolicy = await Gapi.cloudresourcemanager
                    .setIamPolicy(project, currProjPolicy);
                if (returnPolicy !== undefined) {
                    break;
                }
                await wait(10000);
            } catch (err) {
                this._appendLine('Pending on project environment sync up');
            }
        }
        if (returnPolicy === undefined) {
            this.setState({
                dialogAsCode: false,
                dialogBody: 'Failed to set IAM policy, please make sure you have enough permissions.',
                dialogTitle: 'Failed to set IAM policy',
            });
            throw new Error('Failed to set IAM policy');
        }

        const currSAPolicy = await Gapi.iam.getServiceAccountIAM(project, saEmail);
        if (!(bindingKey in currSAPolicy)) {
            currSAPolicy[bindingKey] = [];
        }
        currSAPolicy[bindingKey].push({
            'members': ['user:' + email],
            'role': 'roles/iam.serviceAccountTokenCreator'
        });
        try {
            await Gapi.iam.setServiceAccountIAM(project, saEmail, currSAPolicy);
        } catch (err) {
            this.setState({
                dialogAsCode: false,
                dialogBody: 'Failed to set service account policy, please make sure you have enough permissions.',
                dialogTitle: 'Failed to set service account policy',
            });
            throw err;
        }

        let saToken = null;
        for (let retries = 20; retries > 0; retries -= 1) {
            try {
                saToken = await Gapi.iam.getServiceAccountToken(project, saEmail);
                if (saToken !== undefined) {
                    this.setState({saToken});
                    break;
                }
                await wait(10000);
            } catch (err) {
                this._appendLine('Pending on new service account policy sync up');
            }
        }
        if (saToken === undefined) {
            this.setState({
                dialogAsCode: false,
                dialogBody: 'Failed to create service account token, please make sure you have enough permissions.',
                dialogTitle: 'Failed to create service account token',
            });
            throw new Error('Failed to create service account token');
        }

        let servicesToEnable: string[] = [];
        let enableAttempts = 0;
        const retryTimeout = 5000;
        do {
            try {
                servicesToEnable = await Gapi.sautil
                    .getServicesToEnable(project, saToken, enableAttempts);
            } catch (err) {
                this.setState({
                    dialogAsCode: false,
                    dialogBody: `${email}: Error trying to list enabled services: ${err}`,
                    dialogTitle: 'Deployment Error',
                });
                throw err;
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
                try {
                    await Gapi.sautil.enableServices(project, saToken, s);
                } catch (err) {
                    this._appendLine('Pending on new service account token sync up');
                }
            }
            enableAttempts++;
        } while (servicesToEnable.length && enableAttempts < 50);

        if (servicesToEnable.length && enableAttempts >= 50) {
            this.setState({
                dialogAsCode: false,
                dialogBody: 'Tried too many times to enable these services: ' +
                    servicesToEnable.join(', '),
                dialogTitle: 'Deployment Error',
            });
            throw new Error('Deployment Error');
        }
        this._appendLine(
            'All GCP services are available and configured successfully!');
    }

    /**
     * Helper method to facilitate building a v0.5.0 cluster
     * @param configSpec
     */
    private _getV5BuildRequest(configSpec: {defaultApp: string}): string {
        const {deploymentName, email, project, projectNumber,
            kfversion, saClientId, saToken} = this.state;
        let createBody = {
            AppConfig: configSpec.defaultApp,
            Apply: true,
            AutoConfigure: true,
            Cluster: deploymentName,
            Email: email,
            IpName: deploymentName + '-ip',
            KfVersion: kfversion,
            Name: deploymentName,
            Namespace: 'kubeflow',
            Project: project,
            ProjectNumber: projectNumber,
            SAClientId: saClientId,
            Token: saToken,
            UseKfctl: this.state.kfctlLib,
            Zone: this.state.zone,
        };
        if (this.state.ingress === IngressType.Iap) {
            createBody = {
                ...createBody, ...{
                    ClientId: btoa(this.state.clientId),
                    ClientSecret: btoa(this.state.clientSecret),
                }
            };
        }
        else if (this.state.ingress === IngressType.BasicAuth) {
            createBody = {
                ...createBody, ...{
                    PasswordHash: btoa(encryptPassword(this.state.password)),
                    Username: btoa(this.state.username),
                }
            };
        }

        if (this.state.permanentStorage) {
            createBody = {
                ...createBody, ...{
                    StorageOption: {CreatePipelinePersistentStorage: true},
                }
            };
        }
        return JSON.stringify(createBody);
    }

    /**
     * Helper method to facilitate building a v0.6.0 cluster
     */
    private _getV6BuildRequest(configSpec: {spec: KfDefSpec}): string {
        const {clientSecret, deploymentName, ingress, permanentStorage, project,
            kfversion, saToken, zone} = this.state;

        configSpec.spec.hostname = deploymentName + '.endpoints.' + project + '.cloud.goog';
        configSpec.spec.ipName = `${deploymentName}-ip`;
        configSpec.spec.project = project;
        configSpec.spec.zone = zone;
        configSpec.spec.version = kfversion;
        configSpec.spec.secrets = [
            {
                name: ACCESS_TOKEN,
                secretSource: {literalSource: {value: saToken}}
            },
            {
                name: CLIENT_SECRET,
                secretSource: {literalSource: {value: clientSecret}}
            }
        ];

        const gcpPlugin = {
            name: 'gcp',
            spec: {
                auth: {},
                createPipelinePersistentStorage: permanentStorage
            }
        };
        if (ingress === IngressType.BasicAuth) {
            configSpec.spec.secrets.push({
                name: PASSWORD,
                secretSource: {
                    hashedSource: {
                        value: btoa(encryptPassword(this.state.password))
                    }
                }
            });
            gcpPlugin.spec.auth = {
                basicAuth: {
                    password: {name: PASSWORD},
                    username: this.state.username,
                }
            };
        } else if (ingress === IngressType.Iap) {
            gcpPlugin.spec.auth = {
                iap: {
                    oAuthClientId: this.state.clientId,
                    oAuthClientSecret: {name: CLIENT_SECRET},
                }
            };
        }
        if (!configSpec.spec.plugins) {
            configSpec.spec.plugins = [];
        }
        configSpec.spec.plugins.push(gcpPlugin);
        return JSON.stringify(configSpec);
    }

    private async _loadConfigFile(url: string) {
        this.setState({canSubmit: false});
        try {
            this._configSpec = jsYaml.safeLoad(
                await getFileContentsFromGitHub(url));
            this.setState({canSubmit: true});
        } catch (err) {
            log('Request failed', err);
            this.setState({
                dialogBody: `Failed to load user config from ${url}`,
                dialogTitle: 'Config loading Error',
            });
        }
    }

    private _versionChanged(event: React.ChangeEvent<HTMLSelectElement>) {
        const kfversion = event.target.value;
        const configUrl = kfversion === Version.V05 ?
            ConfigPath.V05 : ConfigPath.V06;
        this._loadConfigFile(configUrl);
        this.setState({kfversion});
    }
}
