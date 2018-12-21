{
  all(params, namespace):: [
    $.parts(params, namespace).coreService,
    $.parts(params, namespace).coreDeployment,
    $.parts(params, namespace).dbService,
    $.parts(params, namespace).dbPVC,
    $.parts(params, namespace).dbDeployment,
    $.parts(params, namespace).dbSecret,
    $.parts(params, namespace).clusterRole,
    $.parts(params, namespace).clusterRoleBinding,
    $.parts(params, namespace).serviceAccount,
    $.parts(params, namespace).coreRestService,
    $.parts(params, namespace).coreRestDeployment,
    $.parts(params, namespace).uiService,
    $.parts(params, namespace).uiDeployment,
    $.parts(params, namespace).uiClusterRole,
    $.parts(params, namespace).uiClusterRoleBinding,
    $.parts(params, namespace).uiServiceAccount,
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
            serviceAccountName: "vizier-core",
            containers: [
              {
                name: "vizier-core",
                image: params.vizierCoreImage,
                env: [
                  {
                    name: "MYSQL_ROOT_PASSWORD",
                    valueFrom: {
                      secretKeyRef: {
                        name: "vizier-db-secrets",
                        key: "MYSQL_ROOT_PASSWORD",
                      },
                    },
                  },
                ],
                command: [
                  "./vizier-manager",
                ],
                ports: [
                  {
                    name: "api",
                    containerPort: 6789,
                  },
                ],
                readinessProbe: {
                  exec: {
                    command: [
                      "/bin/grpc_health_probe",
                      "-addr=:6789",
                    ],
                  },
                  initialDelaySeconds: 5,
                },
                livenessProbe: {
                  exec: {
                    command: [
                      "/bin/grpc_health_probe",
                      "-addr=:6789",
                    ],
                  },
                  initialDelaySeconds: 10,
                },
              },
            ],
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

    clusterRole: {
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
          app: "katib",
        },
        name: "katib-mysql",
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
                name: "vizier-db",
                image: params.vizierDbImage,
                env: [
                  {
                    name: "MYSQL_ROOT_PASSWORD",
                    valueFrom: {
                      secretKeyRef: {
                        name: "vizier-db-secrets",
                        key: "MYSQL_ROOT_PASSWORD",
                      },
                    },
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
                ports: [
                  {
                    name: "dbapi",
                    containerPort: 3306,
                  },
                ],
                readinessProbe: {
                  exec: {
                    command: [
                      "/bin/bash",
                      "-c",
                      "mysql -D $$MYSQL_DATABASE -p$$MYSQL_ROOT_PASSWORD -e 'SELECT 1'",
                    ],
                  },
                  initialDelaySeconds: 5,
                  periodSeconds: 2,
                  timeoutSeconds: 1,
                },
                args: [
                  "--datadir",
                  "/var/lib/mysql/datadir",
                ],
                volumeMounts: [
                  {
                    name: "katib-mysql",
                    mountPath: "/var/lib/mysql",
                  },
                ],
              },
            ],
            volumes: [
              {
                name: "katib-mysql",
                persistentVolumeClaim: {
                  claimName: "katib-mysql",
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

    dbSecret: {
      apiVersion: "v1",
      kind: "Secret",
      type: "Opaque",
      metadata: {
        name: "vizier-db-secrets",
        namespace: namespace,
      },
      data: {
        MYSQL_ROOT_PASSWORD: "dGVzdA==",
      },
    },  // dbSecret

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
                command: [
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
        annotations: {
          "getambassador.io/config":
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: katib-ui-mapping",
              "prefix: /katib/",
              "rewrite: /katib/",
              "service: katib-ui." + namespace,
            ]),
        },  //annotations
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
            serviceAccountName: "katib-ui",
            containers: [
              {
                command: [
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

    uiClusterRole: {
      apiVersion: "rbac.authorization.k8s.io/v1",
      kind: "ClusterRole",
      metadata: {
        name: "katib-ui",
      },
      rules: [
        {
          apiGroups: [
            "",
          ],
          resources: [
            "configmaps",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "kubeflow.org",
          ],
          resources: [
            "studyjobs",
          ],
          verbs: [
            "*",
          ],
        },
      ],
    },  // uiClusterRole

    uiClusterRoleBinding: {
      apiVersion: "rbac.authorization.k8s.io/v1",
      kind: "ClusterRoleBinding",
      metadata: {
        name: "katib-ui",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "katib-ui",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "katib-ui",
          namespace: namespace,
        },
      ],
    },  // uiClusterRoleBinding

    uiServiceAccount: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "katib-ui",
        namespace: namespace,
      },
    },  // uiServiceAccount
  },  //parts
}
