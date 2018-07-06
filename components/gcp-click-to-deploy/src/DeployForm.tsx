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
import { flattenDeploymentOperationError } from './Utils';

interface DeployFormProps {
  getDeploymentTemplates: () => { clusterJinja: string, clusterSpec: any };
  appendLine: (line: string) => void;
}

interface DeployFormState {
  deploymentName: string;
  email: string;
  error: string;
  errorMessage: string;
  hostName: string;
  ipName: string;
  project: string;
  zone: string;
}

const Row = glamorous.div({
  display: 'flex',
  marginBottom: 5,
  minHeight: 35,
});

const Label = glamorous.label({
  alignSelf: 'center',
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

export default class DeployForm extends React.Component<DeployFormProps & React.HTMLAttributes<HTMLFormElement>, DeployFormState> {

  constructor(props: DeployFormProps) {
    super(props);
    this.state = {
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

  public render() {
    return (
      <MuiThemeProvider theme={theme}>

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

  // Create a  Kubeflow deployment.
  private _createDeployment() {
    const templates = this.props.getDeploymentTemplates();
    for (const prop of ['project', 'zone', 'email', 'ipName', 'deploymentName', 'hostName']) {
      if (this.state[prop] === '') {
        this.setState({
          error: 'Missing field',
          errorMessage: 'All fields are required, but it looks like you missed something.',
        });
        return;
      }
    }

    const kubeflow = templates.clusterSpec.resources[0];

    kubeflow.name = this.state.deploymentName;
    kubeflow.properties.zone = this.state.zone;

    // Load the bootstrapper config.
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

    templates.clusterSpec.resources[0] = kubeflow;
    const yamlClusterSpec = jsYaml.dump(templates.clusterSpec);
    this.props.appendLine('\n----------------\nNew deployment:');
    this.props.appendLine('Spec:\n' + jsYaml.dump(yamlClusterSpec));

    const project = this.state.project;
    const deploymentName = this.state.deploymentName;

    const resource = {
      'name': deploymentName,
      'target': {
        'config': {
          'content': yamlClusterSpec,
        },
        'imports': [
          {
            'content': templates.clusterJinja,
            'name': 'cluster.jinja',
          }
        ],
      },
    };

    Gapi.deploymentmanager.insert(project, resource)
      .then(res => {
        this.props.appendLine('Result of insert:\n' + JSON.stringify(res));
        this._monitorDeployment(project, deploymentName)
      })
      .catch(err => {
        this.props.appendLine('Error doing insert:\n' + err);
        this.setState({
          error: 'Deployment Error',
          errorMessage: 'Error trying to create deployment: ' + err,
        });
      });

  } // insertDeployment

  private _monitorDeployment(project: string, deploymentName: string) {
    const monitorInterval = setInterval(() => {
      Gapi.deploymentmanager.get(this.state.project, deploymentName)
        .then(r => {
          if (r.operation!.error && r.operation!.error!.errors!.length) {
            this.props.appendLine(
              'deployment failed with error:' + flattenDeploymentOperationError(r.operation!));
            clearInterval(monitorInterval);
          } else {
            this.props.appendLine(r.operation!.status!);
          }
        })
        .catch(err => this.props.appendLine('deployment failed with error:' + err));
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
