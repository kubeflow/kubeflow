{
  all(params, namespace):: [
    $.parts(params, namespace).coreService,
    $.parts(params, namespace).coreDeployment,
    $.parts(params, namespace).dbService,
    $.parts(params, namespace).dbPVC,
    $.parts(params, namespace).dbDeployment,
    $.parts(params, namespace).clusterRole,
    $.parts(params, namespace).clusterRoleBinding,
    $.parts(params, namespace).serviceAccount,
    $.parts(params, namespace).coreRestService,
    $.parts(params, namespace).coreRestDeployment,
    $.parts(params, namespace).uiService,
    $.parts(params, namespace).uiDeployment,
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

    dbPVC: {
      apiVersion: "v1",
      kind: "PersistentVolumeClaim",
      metadata: {
        labels: {
          app: "vizier",
          component: "db",
        },
        name: "vizier-db",
        namespace: namespace,
      },
      spec: {
        accessModes: [
          "ReadWriteOnce",
        ],
        resources: {
          requests: {
            storage: "10Gi",
          },
        },
      },
    },  // dbPVC

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
                // If we mount block device with ext4 fs as pvc, default data dir has lost+found dir in, and mysql fails to init
                args: [
                  "--datadir",
                  "/var/lib/mysql/datadir",
                ],
                volumeMounts: [
                  {
                    name: "vizier-db",
                    mountPath: "/var/lib/mysql",
                  },
                ],
                ports: [
                  {
                    containerPort: 3306,
                    name: "dbapi",
                  },
                ],
              },
            ],
            volumes: [
              {
                name: "vizier-db",
                persistentVolumeClaim: {
                  claimName: "vizier-db",
                },
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

    coreRestService: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "vizier",
          component: "core-rest",
        },
        name: "vizier-core-rest",
        namespace: namespace,
      },
      spec: {
        ports: [
          {
            name: "api",
            port: 80,
            protocol: "TCP",
          },
        ],
        selector: {
          app: "vizier",
          component: "core-rest",
        },
        type: "ClusterIP",
      },
    },  // uiService

    coreRestDeployment: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "vizier",
          component: "core-rest",
        },
        name: "vizier-core-rest",
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "vizier",
              component: "core-rest",
            },
            name: "vizier-core-rest",
          },
          spec: {
            containers: [
              {
                args: [
                  "./vizier-manager-rest",
                ],
                image: params.vizierCoreRestImage,
                name: "vizier-core-rest",
                ports: [
                  {
                    containerPort: 80,
                    name: "api",
                  },
                ],
              },
            ],
          },
        },
      },
    },  // coreRestDeployment


    uiService: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "vizier",
          component: "ui",
        },
        name: "katib-ui",
        namespace: namespace,
      },
      spec: {
        ports: [
          {
            name: "ui",
            port: 80,
            protocol: "TCP",
          },
        ],
        selector: {
          app: "vizier",
          component: "ui",
        },
        type: "ClusterIP",
      },
    },  // uiService

    uiDeployment: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "vizier",
          component: "ui",
        },
        name: "katib-ui",
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "vizier",
              component: "ui",
            },
            name: "katib-ui",
          },
          spec: {
            containers: [
              {
                args: [
                  "./katib-ui",
                ],
                image: params.katibUIImage,
                name: "katib-ui",
                ports: [
                  {
                    containerPort: 80,
                    name: "ui",
                  },
                ],
              },
            ],
          },
        },
      },
    },  // uiDeployment
  },  //parts
}
