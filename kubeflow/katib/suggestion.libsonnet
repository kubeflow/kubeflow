{
  all(params):: [
    $.parts(params).randomService,
    $.parts(params).randomDeployment,
    $.parts(params).gridService,
    $.parts(params).gridDeployment,
  ],

  parts(params):: {

    randomService: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "vizier",
          component: "suggestion-random",
        },
        name: "vizier-suggestion-random",
        namespace: params.namespace,
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
        namespace: params.namespace,
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
        namespace: params.namespace,
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
        namespace: params.namespace,
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

  },  // parts
}
