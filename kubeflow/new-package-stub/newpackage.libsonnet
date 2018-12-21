{
  local k = import "k.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",
  // The section below is required. The new(_env, _params) hidden method
  // sets a local variable params which is _env + _params
  // All resources defined within self can then access param values as params.<name>
  new(_env, _params):: self {
    local params = _params + _env,

    // Define the various resource manifests as local class variables
    // The resource variable should be descriptive of the resource value being exported,
    // such as the uiService shown below. Note that uiService uses the namespace held in params.
    local uiService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: "newpackage-service",
        namespace: params.namespace,
        labels: {
          name: "ui-service",
        },
      },
      spec: {
        ports: [
          { port: 9090 },
        ],
        selector: {
          app: "ui-service",
        },
        type: "ClusterIP",
      },
    },
    uiService:: uiService,

    local uiDeployment = {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      // K8s Deployment,
    },
    uiDeployment:: uiDeployment,

    // Groupings of manifests allows for prototypes to be defined.
    // For example if you just wanted to export TensorFlow manifests
    // you could do the following:
    local tfPrototype =
      if params.TensorflowOnly then ([
                                       self.uiService,
                                     ]),

    local pyTorchPrototype =
      if params.PyTorchOnly then ([
                                    self.uiDeployment,
                                  ]),

    all:: tfPrototype + pyTorchPrototype,

    list(obj=self.all):: util.list(obj),
  },
}
