{
  // Define the various prototypes you want to support.
  // Each prototype should be a list of different parts that together
  // provide a userful function such as serving a TensorFlow or PyTorch model.
  all(params, name, env):: [
    $.parts(params, name, env).operatorServiceAccount,
    $.parts(params, name, env).operatorClusterRole(),
    $.parts(params, name, env).operatorClusterRoleBinding(),
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
    local namespace = env.namespace,
    local mainClass = if params.mainClass == "null" then "" else params.mainClass,
    local jobArguments = if params.jobArguments == "null" then [] else std.split(params.jobArguments, ","),
    local sparkVersion = params.sparkVersion,

    jobServiceAccount:: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: name,
        namespace: namespace,
      },
    },

    jobClusterRole:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "Role",
      metadata: {
        namespace: namespace,
        name: name,
      },
      rules: [
        {
          apiGroups: [
            "",
          ],
          resources: [
            "pods",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "",
          ],
          resources: [
            "services",
          ],
          verbs: [
            "*",
          ],
        },
      ],
    },
    jobClusterRoleBinding:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "RoleBinding",
      metadata: {
        name: name,
        namespace: namespace,
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: name,
          namespace: namespace,
        },
      ],
      roleRef: {
        kind: "Role",
        name: name,
        apiGroup: "rbac.authorization.k8s.io",
      },
    },
    operatorServiceAccount:: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: name,
        namespace: namespace,
      },
    },
    operatorClusterRole():: {
      local roleType = "ClusterRole",
      kind: roleType,
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      metadata: {
        labels: {
          app: "spark-operator",
        },
        name: name,
      },
      rules: [
        {
          apiGroups: [
            "",
          ],
          resources: [
            "pods",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "",
          ],
          resources: [
            "services",
            "configmaps",
          ],
          verbs: [
            "create",
            "get",
            "delete",
          ],
        },
        {
          apiGroups: [
            "",
          ],
          resources: [
            "nodes",
          ],
          verbs: [
            "get",
          ],
        },
        {
          apiGroups: [
            "",
          ],
          resources: [
            "events",
          ],
          verbs: [
            "create",
            "update",
            "patch",
          ],
        },
        {
          apiGroups: [
            "apiextensions.k8s.io",
          ],
          resources: [
            "customresourcedefinitions",
          ],
          verbs: [
            "create",
            "get",
            "update",
            "delete",
          ],
        },
        {
          apiGroups: [
            "admissionregistration.k8s.io",
          ],
          resources: [
            "mutatingwebhookconfigurations",
          ],
          verbs: [
            "create",
            "get",
            "update",
            "delete",
          ],
        },
        {
          apiGroups: [
            "sparkoperator.k8s.io",
          ],
          resources: [
            "sparkapplications",
            "scheduledsparkapplications",
          ],
          verbs: [
            "*",
          ],
        },
      ],
    },
    operatorClusterRoleBinding():: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      local bindingType = "ClusterRoleBinding",
      local roleType = "ClusterRole",
      kind: bindingType,
      metadata: {
        name: name,
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: name,
          namespace: namespace,
        },
      ],
      roleRef: {
        kind: roleType,
        name: name,
        apiGroup: "rbac.authorization.k8s.io",
      },
    },
    deployment:: {
      apiVersion: "apps/v1beta1",
      kind: "Deployment",
      metadata: {
        name: name,
        namespace: namespace,
        labels: {
          "app.kubernetes.io/name": name,
          "app.kubernetes.io/version": sparkVersion,
        },
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            "app.kubernetes.io/name": name,
            "app.kubernetes.io/version": sparkVersion,
          },
        },
        strategy: {
          type: "Recreate",
        },
        template: {
          metadata: {
            annotations: {
              "prometheus.io/scrape": "true",
              "prometheus.io/port": "10254",
              "prometheus.io/path": "/metrics",
            },
            labels: {
              "app.kubernetes.io/name": name,
              "app.kubernetes.io/version": sparkVersion,
              name: name,
            },
            initializers: {
              pending: [

              ],
            },
          },
          spec: {
            serviceAccountName: name,
            containers: [
              {
                name: name,
                image: params.image,
                imagePullPolicy: "Always",
                command: [
                  "/usr/bin/spark-operator",
                ],
                ports: [
                  {
                    containerPort: 10254,
                  },
                ],
                args: [
                  "-logtostderr",
                  "-enable-metrics=true",
                  "-metrics-labels=app_type",
                ],
              },
            ],
          },
        },
      },
    },
    // Job specific configuration
    sparkJob:: {
      apiVersion: "sparkoperator.k8s.io/v1alpha1",
      kind: "SparkApplication",
      metadata: {
        name: params.jobName,
        namespace: namespace,
      },
      spec: {
        type: params.type,
        mode: "cluster",
        image: params.image,
        imagePullPolicy: "Always",
        mainClass: mainClass,
        mainApplicationFile: params.applicationResource,
        arguments: jobArguments,
        volumes: [
          {
            name: "test-volume",
            hostPath: {
              path: "/tmp",
              type: "Directory",
            },
          },
        ],
        driver: {
          cores: params.driverCores,
          memory: params.driverMemory,
          labels: {
            version: sparkVersion,
          },
          serviceAccount: params.name,
          volumeMounts: [
            {
              name: "test-volume",
              mountPath: "/tmp",
            },
          ],
        },
        executor: {
          cores: params.executorCores,
          instances: params.numExecutors,
          memory: params.executorMemory,
          labels: {
            version: params.sparkVersion,
          },
          volumeMounts: [
            {
              name: "test-volume",
              mountPath: "/tmp",
            },
          ],
        },
        restartPolicy: "Never",
      },
    },
  },
}
