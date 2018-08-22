{
  // Define the various prototypes you want to support.
  // Each prototype should be a list of different parts that together
  // provide a userful function such as serving a TensorFlow or PyTorch model.
  all(params, name, env):: [
    $.parts(params, name, env).serviceAccount,
    $.parts(params, name, env).clusterRole,
  ],

  // Parts should be a dictionary containing jsonnet representations of the various
  // K8s resources used to construct the prototypes listed above.
  parts(params, name, env):: {
    // All ksonnet environments are associated with a namespace and we
    // generally want to use that namespace for a component.
    // However, in some cases an application may use multiple namespaces in which
    // case the namespace for a particular component will be a parameter.
    local namespace = if std.objectHas(params, "namespace") then params.namespace else env.namespace,
    
    serviceAccount:: {
      apiVersion: "v1",
	kind: "ServiceAccount",
	metadata: {
	    name: name + "-sparkoperator",
	    namespace: namespace,
	},
    },
    clusterRole:: {
      kind: "ClusterRole",
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
	"metadata": {
	    "name": name + "-sparkoperator"
	},
	"rules": [
	    {
		"apiGroups": [
		    ""
		],
		"resources": [
		    "pods"
		],
		"verbs": [
		    "*"
		]
	    },
	    {
		"apiGroups": [
		    ""
		],
		"resources": [
		    "services",
		    "configmaps"
		],
		"verbs": [
		    "create",
		    "get",
		    "delete"
		]
	    },
	    {
		"apiGroups": [
		    ""
		],
		"resources": [
		    "nodes"
		],
		"verbs": [
		    "get"
		]
	    },
	    {
		"apiGroups": [
		    ""
		],
		"resources": [
		    "events"
		],
		"verbs": [
		    "create",
		    "update",
		    "patch"
		]
	    },
	    {
		"apiGroups": [
		    "apiextensions.k8s.io"
		],
		"resources": [
		    "customresourcedefinitions"
		],
		"verbs": [
		    "create",
		    "get",
		    "update",
		    "delete"
		]
	    },
	    {
		"apiGroups": [
		    "admissionregistration.k8s.io"
		],
		"resources": [
		    "mutatingwebhookconfigurations"
		],
		"verbs": [
		    "create",
		    "get",
		    "update",
		    "delete"
		]
	    },
	    {
		"apiGroups": [
		    "sparkoperator.k8s.io"
		],
		"resources": [
		    "sparkapplications",
		    "scheduledsparkapplications"
		],
		"verbs": [
		    "*"
		]
	    }
	]
    },
  }
}
