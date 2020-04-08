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

import Gapi from './Gapi';
import {
    encryptPassword, flattenDeploymentOperationError,
    getFileContentsFromGitHub, log, wait
} from './Utils';

/** Relative paths from the root of the repository. */
enum ConfigPath {
    V06 = 'a18d7b07/bootstrap/config/kfctl_gcp_iap.0.6.2.yaml',
    V07IAP = 'https://raw.githubusercontent.com/kubeflow/manifests/v0.7-branch/kfdef/kfctl_gcp_iap.0.7.0.yaml',
    V07BasicAuth = 'https://raw.githubusercontent.com/kubeflow/manifests/v0.7-branch/kfdef/kfctl_gcp_basic_auth.0.7.0.yaml',
}

/** Versions available for deployment. */
enum Version {
    V06 = 'v0.6.2',
    V07 = 'v0.7',
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
    logLines: string[];
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

interface BasicAuth {
    username?: string;
    password?: string;
}

interface IAP {
    oAuthClientId?: string;
    oAuthClientSecret?: string;
}

interface EndpointConfig {
    basicAuth?: BasicAuth;
    iap?: IAP;
}

// Request body for kubeflow version v0.7+
interface C2DRequest {
    configFile?: string;
    // GCP Project Id
    project?: string;
    // deploy Name
    name?: string;
    // user email
    email?: string;

    endpointConfig?: EndpointConfig;
    // GKE Zone
    zone?: string;
    // kubeflow Version
    version?: string;
    shareAnonymousUsage?: boolean;

    skipInitProject?: boolean;
    // Temporary service account access Token
    token?: string;
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
const NAME_FORMAT = '[a-z]([-a-z0-9]*[a-z0-9])?';

const styles: {[key: string]: React.CSSProperties} = {
    btn: {
        marginRight: 20,
        width: 180,
    },
    input: {
        width: '100%',
    },
    logLine: {
        margin: '0.2em 0'
    },
    logLineItem: {
        margin: '0 0.2em'
    },
    logLineLink: {
        color: '#fff',
        margin: '0 0.2em'
    },
    logsArea: {
        backgroundColor: '#333',
        border: 0,
        boxSizing: 'border-box',
        color: '#bbb',
        fontFamily: 'Source Code Pro',
        fontSize: 15,
        height: '100%',
        overflowY: 'scroll',
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
    private _logContainerRef: React.RefObject<HTMLDivElement>;

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
            kfversionList: ['v0.7.0', Version.V06],
            logLines: [],
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

        this._logContainerRef = React.createRef();
        this._renderLogLine = this._renderLogLine.bind(this);
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
        return (
            <div>
                <div style={styles.text}>Create a Kubeflow deployment</div>

                <div style={styles.row}>
                    <TextField label="Project ID" spellCheck={false} style={styles.input} variant="filled"
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
                        value={this.state.kfversion} onChange={this._handleChange('kfversion')}>
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
                        <Button style={styles.btn} variant="contained" color="default"
                            onClick={this._kubeflowAddress.bind(this)}>
                            Kubeflow Service Endpoint
                        </Button>
                    )}
                    {this.state.ingress === IngressType.DeferIap && (
                        <Button style={styles.btn} variant="contained" color="default"
                            onClick={this._toPortForward.bind(this)}>
                            Port Forward
                        </Button>
                    )}
                    <Button style={styles.yamlBtn} variant="outlined" color="default"
                        onClick={this._showYaml.bind(this)}>
                        View YAML
                    </Button>
                </div>

                <div style={logsContainerStyle(this.state.showLogs)} >
                    <Button style={styles.logsToggle} onClick={this._toggleLogs.bind(this)} >
                        {this.state.showLogs ? 'Hide ' : 'Show '} Logs
                    </Button>
                    <div ref={this._logContainerRef} style={styles.logsArea}>
                        {this.state.logLines.map(this._renderLogLine)}
                    </div>
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

    private _appendLine(newLine: string) {
        const line = `${this._currentTime()} ${newLine}`;
        const logLines = this.state.logLines.concat([line]);
        this.setState({logLines});
        const div = this._logContainerRef.current;
        if (div) {
            div.scrollTop = div.scrollHeight;
        }
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
        }
        if (this.state.kfversion.startsWith(Version.V07)) {
            return this._getV7Yaml();
        }
        this.setState({
            dialogAsCode: false,
            dialogBody: 'Unsupported kubeflow version!',
            dialogTitle: 'Version Unsupported',
        });
        return;
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

    /**
     * Helper method to facilitate building a v0.7 cluster
     */
    private _getV7Yaml() {
        const {deploymentName, email, project,
            kfversion, saToken, spartakus, zone} = this.state;
        const createBody: C2DRequest = {
            email,
            name: deploymentName,
            project,
            shareAnonymousUsage: spartakus,
            skipInitProject: true,
            token: saToken,
            version: kfversion,
            zone,

        };
        if (this.state.ingress === IngressType.Iap) {
            createBody.configFile = ConfigPath.V07IAP;
            createBody.endpointConfig = {
                iap: {
                    oAuthClientId: this.state.clientId,
                    oAuthClientSecret: this.state.clientSecret,
                }
            };
        }
        else {
            createBody.configFile = ConfigPath.V07BasicAuth;
            createBody.endpointConfig = {
                basicAuth: {
                    password: this.state.password,
                    username: this.state.username,
                }
            };
        }
        return createBody;
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
        this._redirectToKFDashboard(this.state, dashboardUri);
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
            this.setState({
                dialogAsCode: false,
                dialogBody: 'Please enable cloud resource manager API: https://console.developers.google.com/apis/api/cloudresourcemanager.googleapis.com/' +
                ' and iam API: https://console.developers.google.com/apis/api/iam.googleapis.com/',
                dialogTitle: "Error calling GCP API:" + err.toString(),
            });
            this._appendLine(
                'Could not configure communication with GCP, exiting');
            return;
        }


        let buildEndpoint: string;
        let requestBody: string;
        const configSpec = await this._getYaml();
        if (!configSpec) {
            return;
        }
        if (this.state.kfversion.startsWith(Version.V07)) {
            buildEndpoint = '/kfctl/apps/v1beta1/create';
            requestBody = JSON.stringify(configSpec);
        } else {
            if (this.state.kfversion === Version.V06) {
                buildEndpoint = '/kfctl/apps/v1alpha2/create';
                requestBody = this._getV6BuildRequest(configSpec);
            } else {
                this.setState({
                    dialogAsCode: false,
                    dialogBody: 'Unsupported kubeflow version!',
                    dialogTitle: 'Version Unsupported',
                });
                return;
            }
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
            this._monitorDeployment();
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

    private _monitorDeployment() {
        // Capture the state at the time of the Deployment
        const capturedState = JSON.parse(JSON.stringify(this.state)) as DeployFormState;
        const {deploymentName, project} = capturedState;
        const dashboardUri = 'https://' + deploymentName + '.endpoints.' + project + '.cloud.goog/';
        const monitorInterval = setInterval(() => {
            Gapi.deploymentmanager.get(project, deploymentName)
                .then(r => {
                    if (r.operation!.error && r.operation!.error!.errors!.length) {
                        this._appendLine(
                            'Deployment status: ' + flattenDeploymentOperationError(r.operation!));
                        clearInterval(monitorInterval);
                    } else if (r.operation!.status! && r.operation!.status === 'DONE') {
                        const readyTime = new Date();
                        readyTime.setTime(readyTime.getTime() + (30 * 60 * 1000));
                        this._appendLine('Deployment initialized, configuring environment');
                        this._appendLine('your kubeflow service url should be ready within 30 minutes (by '
                            + readyTime.toLocaleTimeString() + '): https://'
                            + deploymentName + '.endpoints.' + project + '.cloud.goog');
                        this._redirectToKFDashboard(capturedState, dashboardUri);
                        clearInterval(monitorInterval);
                    } else {
                        this._appendLine(`${deploymentName}: Deployment Operation Status: ` + r.operation!.status!);
                    }
                })
                .catch(err => this._appendLine('Deployment status: operation pending.'));
        }, 10000);
    }

    private _redirectToKFDashboard(deploymentState: DeployFormState,
        dashboardUri: string) {
        const expectedTimeSecs = 30 * 60; // 30m
        const startTime = new Date().getTime() / 1000;
        const img = document.createElement('img');
        let imgSource = '';
        if (deploymentState.ingress === IngressType.Iap) {
            // relying on Kubeflow / JupyterHub logo image to be available when the site is ready.
            // The dashboard URI is hosted at a domain different from the deployer
            // app. Fetching a GET on the dashboard is blocked by the browser due
            // to CORS. Therefore we use an img element as a hack which fetches
            // an image served by the target site, the img load is a simple html
            // request and not an AJAX request, thus bypassing the CORS in this
            // case.
            const iconFilename = deploymentState.kfversion === Version.V06 ?
              'favicon-32x32.png' : 'kf-logo_64px.svg';
            imgSource = `${dashboardUri}/assets/${iconFilename}`;
        } else if (deploymentState.ingress === IngressType.BasicAuth) {
            imgSource = `${dashboardUri}/kflogin/favicon.ico`;
        } else {
            this._appendLine('Please use port forward to connect to kubeflow when Skip Endpoint');
            return;
        }
        this._appendLine('Determining if Kubeflow deployment endpoint is available...');
        img.src = `${imgSource}?rand=${Math.random()}`;
        img.id = 'ready_test';
        img.onload = () => {
            window.location.href = dashboardUri;
        };
        img.onerror = () => {
            const elapsedSecs = (new Date().getTime() / 1000) - startTime;
            let estimatedTimeMin = (expectedTimeSecs - elapsedSecs) / 60;
            if (estimatedTimeMin <= 0) {
                estimatedTimeMin = 0;
            }
            const readyImg = document.getElementById('ready_test') as HTMLImageElement;
            if (readyImg != null) {
                setTimeout(() => {
                    readyImg.src = `${imgSource}?rand=${Math.random()}`;
                    this._appendLine(
                        `Waiting for the kubeflow service endpoint to get ready...(Expected time remaining: ${estimatedTimeMin.toFixed(0)}m)`);
                    if (estimatedTimeMin <= 10 &&
                        Math.floor(estimatedTimeMin) % 2 === 0) {
                        this._appendLine(`You may also to try to access your deployment in a new tab at ${dashboardUri}`);
                    }
                }, 30000);
            }
        };
        img.style.display = 'none';
        document.body.appendChild(img);
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
        const {clientId, clientSecret, deploymentName, project,
            password, password2, username, zone} = this.state;
        const err = new Error('Invalid inputs');
        for (const prop of [project, zone, deploymentName]) {
            if (prop === '') {
                this.setState({
                    dialogAsCode: false,
                    dialogBody: 'Some required fields (project, zone, deploymentName) are missing',
                    dialogTitle: 'Missing field',
                });
                throw err;
            }
        }
        if (this.state.ingress === IngressType.Iap) {
            for (const prop of [clientId, clientSecret]) {
                if (prop === '') {
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
            for (const prop of [username, password, password2]) {
                if (prop === '') {
                    this.setState({
                        dialogAsCode: false,
                        dialogBody: 'Some required fields (username, password) are missing',
                        dialogTitle: 'Missing field',
                    });
                    throw err;
                }
            }
            if (password !== password2) {
                this.setState({
                    dialogAsCode: false,
                    dialogBody: 'Two passwords does not match',
                    dialogTitle: 'Passwords not match',
                });
                throw err;
            }
        }
        const maxNameLen = 41 - project.length;
        if (deploymentName.length < 4 || deploymentName.length > maxNameLen) {
            this.setState({
                dialogAsCode: false,
                dialogBody: 'For current project id, deployment name length need to be between 4 and ' + maxNameLen,
                dialogTitle: 'Invalid field',
            });
            throw err;
        }
        const filtered = deploymentName.match(NAME_FORMAT);
        if (!(filtered && deploymentName === filtered[0])) {
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
            await Gapi.servicemanagement.enable(project, 'cloudresourcemanager.googleapis.com')
              .catch(e => this.setState({
                  dialogAsCode: false,
                  dialogBody: `Please enable cloud resource manager API for your project: https://console.developers.google.com/apis/api/cloudresourcemanager.googleapis.com/`,
                  dialogTitle: 'Please enable cloud resource manager API',
              }));
            await wait(10000);
            projectNumber = await Gapi.cloudresourcemanager
              .getProjectNumber(project);
            this.setState({projectNumber});
        }

        this._appendLine('Proceeding with project number: ' + projectNumber);

        const accountId = 'kubeflow-deploy-admin';
        const saEmail = accountId + '@' + project + '.iam.gserviceaccount.com';
        let saClientId: string;

        try {
            saClientId = await Gapi.iam.getServiceAccountId(project, saEmail);
            if (!saClientId) {
                saClientId = await Gapi.iam
                  .createServiceAccount(project, accountId);
            }
            this.setState({saClientId});
        } catch (err) {
            this._appendLine('Enabling API: iam.googleapis.com');
            await Gapi.servicemanagement.enable(project, 'iam.googleapis.com')
              .catch(e => this.setState({
                  dialogAsCode: false,
                  dialogBody: `Please enable iam API for your project: https://console.developers.google.com/apis/api/iam.googleapis.com/`,
                  dialogTitle: 'Please enable iam API',
              }));
            await wait(10000);
            try {
                saClientId = await Gapi.iam.getServiceAccountId(project, saEmail);
                if (!saClientId) {
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
            } catch (err) {
                this._appendLine('Pending on project environment sync up');
            }
            await wait(10000);
        }
        if (!returnPolicy) {
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
            } catch (err) {
                this._appendLine('Pending on new service account policy sync up');
            }
            await wait(10000);
        }
        if (!saToken) {
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

    // Renders a log line by extracting any links to anchor tags
    private _renderLogLine(line: string, index: number) {
        const pieces = line.split(' ');
        const lineContent = pieces.map((s, i) =>
            s.startsWith('http') ?
                <a target="_blank" className="logLineLink"
                    style={styles.logLineLink} href={s} key={i}>{s}</a> :
                <span style={styles.logLineItem} key={i}>{s}</span>
        );
        return <p key={index} style={styles.logLine}>
            {lineContent.map((s) => s)}
        </p>;
    }
}
