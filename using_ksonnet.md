# Using Ksonnet 

## How kubeflow uses ksonnet

ks doesn't support adding registries yet [ksonnet/ksonnet/issues/38](https://github.com/ksonnet/ksonnet/issues/38); so we can't
define Kubeflow prototypes and a Kubeflow package which the user can use to initialize their config.

* So for now we check in a ksonnet app "my-kubeflow"
* libsonnet files corresponding to Kubeflow protoypes are in the lib/ directory

* The expectation is we will eventually 
   * Have a Kubeflow ksonnet [registry](https://ksonnet.io/docs/concepts#registry) with multiple packages
   * Some of these component packages will be for individual components (e.g. JupyterHub, Airflow etc...)
   * We will probably have one or more packages corresponding to the Kubeflow deployment as a whole.


* Following the [tutorial](https://ksonnet.io/docs/tutorial) the user experience would be something like

```
ks init my-kubeflow
cd my-kubeflow
ks generate kubeflow-deployment kubeflow-component ...
ks apply default
```

##
Instructions for using ksonnet to configure the deployment.

Install the ksonnet CLI.

Initialize a ksonnet app to represent your deployment.

```
ks init my-kubeflow
```

