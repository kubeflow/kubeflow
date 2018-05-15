{
  // Define the various prototypes you want to support.
  // Each prototype should be a list of different parts that together
  // provide a userful function such as serving a TensorFlow or PyTorch model.
  tfPrototype(params, env):: [
    $.parts(params, env).myTFServer,
    $.parts(params, env).myTFBackendServer,
  ],

  pyTorchPrototype(params, env):: [
    $.parts(params, env).myPyTorchServer,
    $.parts(params, env).myPyTorchBackendServer,
  ],

  // Parts should be a dictionary containing jsonnet representations of the various
  // K8s resources used to construct the prototypes listed above.
  parts(params, env):: {
    // All ksonnet environments are associated with a namespace and we
    // generally want to use that namespace for a component.
    // However, in some cases an application may use multiple namespaces in which
    // case the namespace for a particular component will be a parameter.
    local namespace = if std.objectHas(params, "namespace") then params.namespace else env.namespace,

    myTFServer:: {
      // K8s Deployment,
    },

    myTFBackendServer:: {
      // K8s Deployment,
    },

    myPyTorchServer:: {
      // K8s Deployment,
    },

    myPyTorchBackendServer:: {
      // K8s Deployment,
    },
  },
}
