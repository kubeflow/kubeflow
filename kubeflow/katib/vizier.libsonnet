{
  all(params, namespace):: [
    $.parts(params, namespace).coreService,
    $.parts(params, namespace).coreDeployment,
    $.parts(params, namespace).dbService,
    $.parts(params, namespace).dbDeployment,
    $.parts(params, namespace).clusterRole,
    $.parts(params, namespace).clusterRoleBinding,
    $.parts(params, namespace).serviceAccount,
  ],

  parts(params, namespace):: {

    coreService: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "vizier",
          component: "core",
        },
        name: "vizier-core",
        namespace: namespace,
      },
      spec: {
        ports: [
          {
            name: "api",
            nodePort: 30678,
            port: 6789,
            protocol: "TCP",
          },
        ],
        selector: {
          app: "vizier",
          component: "core",
        },
        type: "NodePort",
      },
    },  // coreService

    coreDeployment: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "vizier",
          component: "core",
        },
        name: "vizier-core",
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "vizier",
              component: "core",
            },
            name: "vizier-core",
          },
          spec: {
            containers: [
              {
                args: [
                  "./vizier-manager",
                  "-w",
                  "kubernetes",
                  "-i",
                  "k-cluster.example.net",
                ],
                image: params.vizierCoreImage,
                name: "vizier-core",
                ports: [
                  {
                    containerPort: 6789,
                    name: "api",
                  },
                ],
              },
            ],
            serviceAccountName: "vizier-core",
          },
        },
      },
    },  // coreDeployment

    clusterRoleBinding: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        name: "vizier-core",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "vizier-core",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "vizier-core",
          namespace: namespace,
        },
      ],
    },

    clusterRole:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        name: "vizier-core",
      },
      rules: [
        {
          apiGroups: [
            "",
          ],
          resources: [
            "pods",
            "nodes",
            "nodes/*",
            "pods/log",
            "pods/status",
            "services",
            "persistentvolumes",
            "persistentvolumes/status",
            "persistentvolumeclaims",
            "persistentvolumeclaims/status",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "batch",
          ],
          resources: [
            "jobs",
            "jobs/status",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "extensions",
          ],
          resources: [
            "ingresses",
            "ingresses/status",
            "deployments",
            "deployments/status",
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
    },  // clusterRole

    serviceAccount: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "vizier-core",
        namespace: namespace,
      },
    },

    dbDeployment: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "vizier",
          component: "db",
        },
        name: "vizier-db",
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "vizier",
              component: "db",
            },
            name: "vizier-db",
          },
          spec: {
            containers: [
              {
                env: [
                  {
                    name: "MYSQL_ROOT_PASSWORD",
                    value: "test",
                  },
                  {
                    name: "MYSQL_ALLOW_EMPTY_PASSWORD",
                    value: "true",
                  },
                  {
                    name: "MYSQL_DATABASE",
                    value: "vizier",
                  },
                ],
                image: params.vizierDbImage,
                name: "vizier-db",
                ports: [
                  {
                    containerPort: 3306,
                    name: "dbapi",
                  },
                ],
              },
            ],
          },
        },
      },
    },  // dbDeployment

    dbService: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "vizier",
          component: "db",
        },
        name: "vizier-db",
        namespace: namespace,
      },
      spec: {
        ports: [
          {
            name: "dbapi",
            port: 3306,
            protocol: "TCP",
          },
        ],
        selector: {
          app: "vizier",
          component: "db",
        },
        type: "ClusterIP",
      },
    },  // dbService

  },  //parts
}
