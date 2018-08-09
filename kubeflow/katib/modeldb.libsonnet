{
  all(params, namespace):: [
    $.parts(params, namespace).backendService,
    $.parts(params, namespace).backendDeployment,
    $.parts(params, namespace).dbService,
    $.parts(params, namespace).dbDeployment,
    $.parts(params, namespace).frontendService,
    $.parts(params, namespace).frontendDeployment,
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
                args: [
                  "modeldb-db",
                ],
                image: params.modeldbImage,
                name: "modeldb-backend",
                ports: [
                  {
                    containerPort: 6543,
                    name: "api",
                  },
                ],
              },
            ],
          },
        },
      },
    },  // backendDeployment

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
              },
            ],
          },
        },
      },
    },  // dbDeployment

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
              "prefix: /katib/",
              "rewrite: /katib/",
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

  },  // parts
}
