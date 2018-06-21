import * as jsYaml from 'js-yaml';
import * as React from 'react';

const gapi: any = null;

interface NameFormProps {
  getDeploymentTemplates: () => { clusterJinja: string, clusterSpec: any };
  appendLine: (line: string) => void;
}

interface NameFormState {
  deploymentName: string;
  email: string;
  hostName: string;
  ipName: string;
  project: string;
  zone: string;
}

export default class NameForm extends React.Component<NameFormProps & React.HTMLAttributes<HTMLFormElement>, NameFormState> {
  public handleChange: any;
  public handleSubmit: any;

  constructor(props: NameFormProps) {
    super(props);
    this.state = {
      deploymentName: 'kubeflow',
      email: 'john@doe.com',
      hostName: '<HOST>.endpoints.<PROJECT>.cloud.goog',
      ipName: 'kubeflow',
      project: 'cloud-ml-dev',
      zone: 'us-east1-d',
    };

    this.handleChange = this._handleChange.bind(this);
    this.handleSubmit = this._handleSubmit.bind(this);
  }

  // Create a  Kubeflow deployment.
  public createDeployment() {
    const templates = this.props.getDeploymentTemplates();
    if (this.state.project === '') {
      alert('You must set project');
      return
    }

    if (this.state.zone === '') {
      alert('You must set zone');
      return
    }
    if (this.state.email === '') {
      alert('You must set email');
      return
    }
    if (this.state.ipName === '') {
      alert('You must set IP Name');
      return
    }
    if (this.state.deploymentName === '') {
      alert('You must set deployment name');
      return
    }
    if (this.state.hostName === '') {
      alert('You must set hostname');
      return
    }

    const kubeflow = templates.clusterSpec.resources[0];

    kubeflow.name = this.state.deploymentName;
    kubeflow.properties.zone = this.state.zone;

    // Load the bootstrapper config.
    const config: any = jsYaml.safeLoad(kubeflow.properties.bootstrapperConfig);

    if (config == null) {
      alert('Property bootstrapperConfig not found in deployment config.');
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
    this.props.appendLine('Spec:\n' + jsYaml.dump(yamlClusterSpec));

    const resource = {
      'name': this.state.deploymentName,
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

    gapi.client.deploymentmanager.deployments.insert({
      project: this.state.project,
      resource,
    }).then((res: any) => {
      this.props.appendLine('Result of insert:\n' + res);
    }, (err: any) => {
      this.props.appendLine('Error doing insert:\n' + err);
      alert('Error doing insert: ' + err)
    });

  } // insertDeployment

  public render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Project:
              <input type='text' name='project' value={this.state.project} onChange={this.handleChange} />
            </label>
          </div>
          <div>
            <label>
              Deployment name:
              <input type='text' name='deploymentName' value={this.state.deploymentName} onChange={this.handleChange} />
            </label>
          </div>
          <div>
            <label>
              Zone
              <input type='text' name='zone' value={this.state.zone} onChange={this.handleChange} />
            </label>
          </div>
          <div>
            <label>
              IP name:
              <input type='text' name='ipName' value={this.state.ipName} onChange={this.handleChange} />
            </label>
          </div>
          <div>
            <label>
              hostname:
              <input type='text' name='hostname' value={this.state.hostName} onChange={this.handleChange} />
            </label>
          </div>
          <div>
            <label>
              Email for Lets Encrypt:
              <input type='text' name='email' value={this.state.email} onChange={this.handleChange} />
            </label>
          </div>
        </form>
        <div>
          {/* TODO: REVISIT */}
          <button className='createDeployment' onClick={this.createDeployment}>
            Create Deployment
      </button>
        </div>
      </div>
    );
  }

  private _handleChange(event: Event) {
    const target = event.target as any;
    this.setState({
      [target.name]: target.value
    } as any);
  }

  // TODO(jlewi): We aren't really using submit since we don't want to post the data anywhere.
  private _handleSubmit(event: any) {
    event.preventDefault();
  }

}
