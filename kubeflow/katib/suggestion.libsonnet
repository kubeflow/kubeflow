{
  all(params, namespace):: [
    $.parts(params, namespace).randomService,
    $.parts(params, namespace).randomDeployment,
    $.parts(params, namespace).gridService,
    $.parts(params, namespace).gridDeployment,
    $.parts(params, namespace).hyperbandService,
    $.parts(params, namespace).hyperbandDeployment,
    $.parts(params, namespace).bayesianoptimizationService,
    $.parts(params, namespace).bayesianoptimizationDeployment,
  ],

  parts(params, namespace):: {

    randomService: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "vizier",
          component: "suggestion-random",
        },
        name: "vizier-suggestion-random",
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
          component: "suggestion-random",
        },
        type: "ClusterIP",
      },
    },

    randomDeployment: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "vizier",
          component: "suggestion-random",
        },
        name: "vizier-suggestion-random",
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "vizier",
              component: "suggestion-random",
            },
            name: "vizier-suggestion-random",
          },
          spec: {
            containers: [
              {
                image: params.suggestionRandomImage,
                name: "vizier-suggestion-random",
                ports: [
                  {
                    containerPort: 6789,
                    name: "api",
                  },
                ],
              },
            ],
          },
        },
      },
    },  // randomDeployment

    gridService: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "vizier",
          component: "suggestion-grid",
        },
        name: "vizier-suggestion-grid",
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
          component: "suggestion-grid",
        },
        type: "ClusterIP",
      },
    },  // gridService

    gridDeployment: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "vizier",
          component: "suggestion-grid",
        },
        name: "vizier-suggestion-grid",
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "vizier",
              component: "suggestion-grid",
            },
            name: "vizier-suggestion-grid",
          },
          spec: {
            containers: [
              {
                image: params.suggestionGridImage,
                name: "vizier-suggestion-grid",
                ports: [
                  {
                    containerPort: 6789,
                    name: "api",
                  },
                ],
              },
            ],
          },
        },
      },
    },  // gridDeployment

    hyperbandService: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "vizier",
          component: "suggestion-hyperband",
        },
        name: "vizier-suggestion-hyperband",
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
          component: "suggestion-hyperband",
        },
        type: "ClusterIP",
      },
    },  // hyperbandService

    hyperbandDeployment: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "vizier",
          component: "suggestion-hyperband",
        },
        name: "vizier-suggestion-hyperband",
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "vizier",
              component: "suggestion-hyperband",
            },
            name: "vizier-suggestion-hyperband",
          },
          spec: {
            containers: [
              {
                image: params.suggestionHyperbandImage,
                name: "vizier-suggestion-hyperband",
                ports: [
                  {
                    containerPort: 6789,
                    name: "api",
                  },
                ],
              },
            ],
          },
        },
      },
    },  // hyperbandDeployment

    bayesianoptimizationService: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "vizier",
          component: "suggestion-bayesianoptimization",
        },
        name: "vizier-suggestion-bayesianoptimization",
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
          component: "suggestion-bayesianoptimization",
        },
        type: "ClusterIP",
      },
    },  // bayesianoptimizationService

    bayesianoptimizationDeployment: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "vizier",
          component: "suggestion-bayesianoptimization",
        },
        name: "vizier-suggestion-bayesianoptimization",
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "vizier",
              component: "suggestion-bayesianoptimization",
            },
            name: "vizier-suggestion-bayesianoptimization",
          },
          spec: {
            containers: [
              {
                image: params.suggestionBayesianOptimizationImage,
                name: "vizier-suggestion-bayesianoptimization",
                ports: [
                  {
                    containerPort: 6789,
                    name: "api",
                  },
                ],
              },
            ],
          },
        },
      },
    },  // bayesianoptimizationDeployment

  },  // parts
}
