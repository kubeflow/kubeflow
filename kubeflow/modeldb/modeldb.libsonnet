{
  all(params, namespace):: [
    $.parts(params, namespace).backendService,
    $.parts(params, namespace).backendPVC,
    $.parts(params, namespace).backendDeployment,
    $.parts(params, namespace).frontendService,
    $.parts(params, namespace).frontendDeployment,
  ] + if params.mongoDbService != "" then [] else [
    $.parts(params, namespace).dbService,
    $.parts(params, namespace).dbPVC,
    $.parts(params, namespace).dbDeployment,
  ],

  parts(params, namespace):: {
    backendService: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: "modeldb-backend",
        namespace: namespace,
        labels: {
          app: "modeldb",
          component: "backend",
        },
      },
      spec: {
        type: "ClusterIP",
        ports: [
          {
            port: 6543,
            protocol: "TCP",
            name: "api",
          },
        ],
        selector: {
          app: "modeldb",
          component: "backend",
        },
      },
    },  // backendService
    backendPVC: {
      apiVersion: "v1",
      kind: "PersistentVolumeClaim",
      metadata: {
        labels: {
          app: "modeldb",
          component: "backend",
        },
        name: "modeldb-backend-pvc",
        namespace: namespace,
      },
      spec: {
        accessModes: [
          "ReadWriteOnce",
        ],
        resources: {
          requests: {
            storage: params.modeldbBackendPvcSize,
          },
        },
      },
    },  // backendPersistentVolumeClaim
    backendDeployment: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "modeldb",
          component: "backend",
        },
        name: "modeldb-backend",
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "modeldb",
              component: "backend",
            },
            name: "modeldb-backend",
          },
          spec: {
            containers: [
              {
                env: [
                  {
                    name: "MONGODB_HOST",
                    value: if params.mongoDbService != "" then params.mongoDbService else "modeldb-db",
                  },
                ],
                args: [
                  if params.mongoDbService != "" then params.mongoDbService else "modeldb-db",
                ],
                image: params.modeldbImage,
                name: "modeldb-backend",
                ports: [
                  {
                    containerPort: 6543,
                    name: "api",
                  },
                ],
                volumeMounts: [
                  {
                    mountPath: "/db",
                    name: "modeldb-persistent-storage",
                  },
                ],
              },
            ],
            volumes: [
              {
                name: "modeldb-persistent-storage",
                persistentVolumeClaim: {
                  claimName: "modeldb-backend-pvc",
                },
              },
            ],
          },
        },
      },
    },  // backendDeployment

    frontendService: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "modeldb",
          component: "frontend",
        },
        name: "modeldb-frontend",
        namespace: namespace,
        annotations: {
          "getambassador.io/config":
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: modeldb-mapping",
              "prefix: /modeldb/",
              "rewrite: /modeldb/",
              "method: GET",
              "service: " + "modeldb-frontend." + namespace + ":3000",
            ]),
        },  //annotations

      },
      spec: {
        ports: [
          {
            name: "api",
            port: 3000,
            protocol: "TCP",
          },
        ],
        selector: {
          app: "modeldb",
          component: "frontend",
        },
        type: "ClusterIP",
      },
    },  // frontendService
    frontendDeployment: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "modeldb",
          component: "frontend",
        },
        name: "modeldb-frontend",
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "modeldb",
              component: "frontend",
            },
            name: "modeldb-frontend",
          },
          spec: {
            containers: [
              {
                args: [
                  "modeldb-backend",
                ],
                env: [
                  {
                    name: "ROOT_PATH",
                    value: "/katib",
                  },
                  {
                    name: "BACKEND_HOST",
                    value: "modeldb-backend",
                  },
                ],
                image: params.modeldbFrontendImage,
                imagePullPolicy: "IfNotPresent",
                name: "modeldb-frontend",
                ports: [
                  {
                    containerPort: 3000,
                    name: "webapi",
                  },
                ],
              },
            ],
          },
        },
      },
    },  // frontendDeployment

    dbService: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "modeldb",
          component: "db",
        },
        name: "modeldb-db",
        namespace: namespace,
      },
      spec: {
        ports: [
          {
            name: "dbapi",
            port: 27017,
            protocol: "TCP",
          },
        ],
        selector: {
          app: "modeldb",
          component: "db",
        },
        type: "ClusterIP",
      },
    },  // dbService
    dbPVC: {
      apiVersion: "v1",
      kind: "PersistentVolumeClaim",
      metadata: {
        labels: {
          app: "modeldb",
          component: "db",
        },
        name: "modeldb-db-pvc",
        namespace: namespace,
      },
      spec: {
        accessModes: [
          "ReadWriteOnce",
        ],
        resources: {
          requests: {
            storage: params.modeldbMongoPvcSize,
          },
        },
      },
    },  // dbPersistentVolumeClaim
    dbDeployment: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "modeldb",
          component: "db",
        },
        name: "modeldb-db",
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "modeldb",
              component: "db",
            },
            name: "modeldb-db",
          },
          spec: {
            containers: [
              {
                image: params.modeldbDatabaseImage,
                name: "modeldb-db",
                ports: [
                  {
                    containerPort: 27017,
                    name: "dbapi",
                  },
                ],
                volumeMounts: [
                  {
                    mountPath: "/data/db",
                    name: "mongodb-persistent-storage",
                  },
                ],
              },
            ],
            volumes: [
              {
                name: "mongodb-persistent-storage",
                persistentVolumeClaim: {
                  claimName: "modeldb-db-pvc",
                },
              },
            ],
          },
        },
      },
    },  // dbDeployment
  },  // parts
}
