# kfctl client


## usage
```
Usage:
  kfctl [command]

Available Commands:
  add         Add a registry|pkg|module|component to the kubeflow application.
  apply       Deploy a generated kubeflow application.
  completion  Output shell completion code for the specified shell (bash or zsh).
  create      Send the yaml created from init to the backend server
  delete      Delete a kubeflow application.
  generate    Generate a kubeflow application using <name>.yaml.
  get         Get a kubeflow application's yaml definition.
  help        Help about any command
  init        Create a yaml file template that can be used to create a kubeflow application
  list        List a kubeflow (application|pkg|module|component|parameter)s.
  remove      Remove one or more (pkg|module|component)'s in a kubeflow application.
  set         Apply one or more parameters to a component within a module in a kubeflow application.
  show        Fetch all manifests in a kubeflow (application|module|component).
  validate    Validate all manifests in a kubeflow (application|module|component).
  version     Prints the version of kfctl.

Flags:
  -c, --config string   config file (default is $HOME/.kfctl.yaml)
  -h, --help            help for kfctl
  -t, --token string    token used in auth header
  -u, --url string      url where bootstrapper is running

Use "kfctl [command] --help" for more information about a command.
```

### yaml file
```yaml
apiVersion: app.kubeflow.org/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: kubeflow
appAddress: https://35.203.163.54
app:
  env:
    name: default
    targets:
    - core
    - jupyter
  modules:
  - name: core
    components:
    - name: ambassador
      prototype: ambassador
    - name: centraldashboard
      prototype: centraldashboard
  - name: jupyter
    components:
    - name: jupyter
      prototype: jupyter
  parameters:
  - module: core
    - component: ambassador
      name: ambassadorServiceType
      value: LoadBalancer
  registries:
  - name: kubeflow
    version: github.com/kubeflow/kubeflow@v0.3.4
    path: kubeflow
```
