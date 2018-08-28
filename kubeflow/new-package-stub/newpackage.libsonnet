{
  // The section below is required. The all(params) hidden method
  // returns a mixin of self + util + the params dictionary.
  // All resources defined within self can then access params as $.parms.<name>
  // Note that params is passed in as a union of (env+params) in newpackage.jsonnet.
  local util = import "kubeflow/core/util.libsonnet",
  new(params):: self + util + {
    params+: params,
  },

  // Define the various resource manifests required by this package as a set of dictionary entries
  //
  //   ResourceName1:: {
  //     Resource1 Manifest
  //   },
  //   ResourceName2:: {
  //     Resource2 Manifest
  //   },
  //
  // The golang convention is used where a resource name that begins with an uppercase
  // letter will exports its value in the list of resources emitted. See util.list.
  // The resource name should be descriptive of the resource value being exported,
  // such as the UIService shown below. Note that UIService uses the namespace held in $.params.
  UIService:: {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "newpackage-service",
      namespace: $.params.namespace,
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

  UIDeployment:: {
    apiVersion: "extensions/v1beta1",
    kind: "Deployment",
    // K8s Deployment,
  },

  // Groupings of manifests allows for prototypes to be defined.
  // For example if you just wanted to export TensorFlow manifests
  // you could do the following:
  TFPrototype:: if $.params.TensorflowOnly then (self + {
                                                   TFServer: {
                                                     // TFServer manifest,
                                                   },
                                                   TFBackendServer: {
                                                     // TFBackendServer manifest,
                                                   },
                                                 }),

  PyTorchPrototype:: if $.params.PyTorchOnly then (self + {
                                                     PyTorchServer: {
                                                       // PyTorchServer manifest
                                                     },
                                                     PyTorchBackendServer: {
                                                       // PyTorchBackendServer manifest
                                                     },
                                                   }),
}
