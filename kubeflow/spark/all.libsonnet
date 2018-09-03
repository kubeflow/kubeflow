{
  // Define the various prototypes you want to support.
  // Each prototype should be a list of different parts that together
  // provide a userful function such as serving a TensorFlow or PyTorch model.
  all(params, name, env):: [
    $.parts(params, name, env).operatorServiceAccount,
    $.parts(params, name, env).operatorClusterRole,
    $.parts(params, name, env).operatorClusterRoleBinding,
    $.parts(params, name, env).deployment,
  ],

  sparkJob(params, name, env):: [
    $.parts(params, name, env).jobServiceAccount,
    $.parts(params, name, env).jobClusterRole,
    $.parts(params, name, env).jobClusterRoleBinding,
    $.parts(params, name, env).sparkJob,
  ],

  // Parts should be a dictionary containing jsonnet representations of the various
  // K8s resources used to construct the prototypes listed above.
  parts(params, name, env):: {
    // All ksonnet environments are associated with a namespace and we
    // generally want to use that namespace for a component.
    // However, in some cases an application may use multiple namespaces in which
    // case the namespace for a particular component will be a parameter.
    local namespace = if std.objectHas(params, "namespace") then params.namespace else env.namespace,
    local mainClass = if params.mainClass == "null"  then "" else params.mainClass,
    local jobArguments = if params.jobArguments == "null" then [] else std.split(params.jobArguments, ","),

    jobServiceAccount:: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      "metadata": {
        "name": name + "-spark",
        "namespace": namespace,
      }
    },

    jobClusterRole:: {
      "apiVersion": "rbac.authorization.k8s.io/v1beta1",
      "kind": "Role",
      "metadata": {
        "namespace": namespace,
        "name": name + "-spark-role"
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
        "services"
      ],
      "verbs": [
        "*"
      ]
    }
  ]
},
    jobClusterRoleBinding:: {
  "apiVersion": "rbac.authorization.k8s.io/v1beta1",
  "kind": "RoleBinding",
  "metadata": {
    "name": name + "-spark-role-binding",
    "namespace": namespace
  },
  "subjects": [
    {
      "kind": "ServiceAccount",
      "name": name + "-spark",
      "namespace": "default"
    }
  ],
  "roleRef": {
    "kind": "Role",
    "name": name + "-spark-role",
    "apiGroup": "rbac.authorization.k8s.io"
  }
},
    operatorServiceAccount:: {
      apiVersion: "v1",
	kind: "ServiceAccount",
	metadata: {
	    name: name + "-sparkoperator",
	    namespace: namespace,
	},
    },
    operatorClusterRole:: {
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
    operatorClusterRoleBinding:: {
	"apiVersion": "rbac.authorization.k8s.io/v1beta1",
	"kind": "ClusterRoleBinding",
	"metadata": {
	    "name": name + "-sparkoperator"
	},
	"subjects": [
	    {
		"kind": "ServiceAccount",
		"name": name + "-sparkoperator",
		"namespace": namespace,
	    }
	],
	"roleRef": {
	    "kind": "ClusterRole",
	    "name": name + "-sparkoperator",
	    "apiGroup": "rbac.authorization.k8s.io"
	}
    },
    deployment:: {
	"apiVersion": "apps/v1beta1",
	"kind": "Deployment",
	"metadata": {
	    "name": name + "-sparkoperator",
	    "namespace": namespace,
	    "labels": {
		"app.kubernetes.io/name": name + "-sparkoperator",
		"app.kubernetes.io/version": "v2.3.1-v1alpha1"
	    }
	},
	"spec": {
	    "replicas": 1,
	    "selector": {
		"matchLabels": {
		    "app.kubernetes.io/name": name + "-sparkoperator",
		    "app.kubernetes.io/version": "v2.3.1-v1alpha1"
		}
	    },
	    "strategy": {
		"type": "Recreate"
	    },
	    "template": {
		"metadata": {
		    "annotations": {
			"prometheus.io/scrape": "true",
			"prometheus.io/port": "10254",
			"prometheus.io/path": "/metrics"
		    },
		    "labels": {
			"app.kubernetes.io/name": name + "-sparkoperator",
			"app.kubernetes.io/version": "v2.3.1-v1alpha1"
		    },
		    "initializers": {
			"pending": [

			]
		    }
		},
		"spec": {
		    "serviceAccountName": name + "-sparkoperator",
		    "containers": [
			{
			    "name": name + "-sparkoperator",
			    "image": params.image,
			    "imagePullPolicy": "Always",
			    "command": [
				"/usr/bin/spark-operator"
			    ],
			    "ports": [
				{
				    "containerPort": 10254
				}
			    ],
			    "args": [
				"-logtostderr",
				"-enable-metrics=true",
				"-metrics-labels=app_type"
			    ]
			}
		    ]
		}
	    }
	}
    },
    // Job specific configuration
    sparkJob:: {
      "apiVersion": "sparkoperator.k8s.io/v1alpha1",
      "kind": "SparkApplication",
      "metadata": {
	"name": params.jobName,
	"namespace": namespace
      },
      "spec": {
	"type": params.type,
	"mode": "cluster",
	"image": params.image,
	"imagePullPolicy": "Always",
	"mainClass": mainClass,
	"mainApplicationFile": params.applicationResource,
        "arguments": jobArguments,
	"volumes": [
	  {
	    "name": "test-volume",
	    "hostPath": {
	      "path": "/tmp",
	      "type": "Directory"
	    }
	  }
	],
	"driver": {
	  "cores": params.driverCores,
	  "memory": params.driverMemory,
	  "labels": {
	    "version": params.sparkVersion
	  },
	  // Fix this
	  "serviceAccount": params.name + "-spark",
	  "volumeMounts": [
	    {
	      "name": "test-volume",
	      "mountPath": "/tmp"
	    }
	  ]
	},
	"executor": {
	  "cores": 1,
	  "instances": 1,
	  "memory": params.executorMemory,
	  "labels": {
	    "version": "2.3.1"
	  },
	  "volumeMounts": [
	    {
	      "name": "test-volume",
	      "mountPath": "/tmp"
	    }
	  ]
	},
	"restartPolicy": "Never"
      }
    },
  }
}
