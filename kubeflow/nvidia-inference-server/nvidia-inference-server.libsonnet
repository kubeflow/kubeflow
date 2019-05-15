{
  // Parameters are intended to be late bound.
  params:: {
    version: "v1",
    name: null,
    namespace: null,
    image: null,
    numGpus: 1,
    modelRepositoryPath: null,
    serviceType: "LoadBalancer",
    labels: {
      app: $.params.name,
    },
  },

  components:: {
    all:: [
      $.parts.inferenceService,
      $.parts.inferenceServerDeployment,
    ],
  }.all,

  parts:: {
    // We define the containers one level beneath parts because
    // combined with jsonnet late binding this makes it easy for users
    // to override specific bits of the container.
    inferenceServerContainer:: {
      name: $.params.name,
      image: $.params.image,
      imagePullPolicy: "IfNotPresent",
      args: [
        "trtserver",
        "--model-store=" + $.params.modelRepositoryPath,
      ],
      ports: [
        {
          containerPort: 8000,
        },
        {
          containerPort: 8001,
        },
        {
          containerPort: 8002,
        },
      ],
      livenessProbe: {
        httpGet: {
          path: "/api/health/live",
          port: 8000,
        },
        initialDelaySeconds: 5,
        periodSeconds: 5,
      },
      readinessProbe: {
        httpGet: {
          path: "/api/health/ready",
          port: 8000,
        },
        initialDelaySeconds: 5,
        periodSeconds: 5,
      },
      resources: {
        limits: {
          "nvidia.com/gpu": $.params.numGpus,
        },
      },
      // Per best practices we don't run as the root user. The
      // inference server container will create a user with ID 1000.
      securityContext: {
        runAsUser: 1000,
        fsGroup: 1000,
      },
    },  // inferenceServerContainer

    inferenceServerMetadata: {
      labels: $.params.labels { version: $.params.version },
    },

    inferenceServerDeployment: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: $.params.name + "-" + $.params.version,
        namespace: $.params.namespace,
        labels: $.params.labels,
      },
      spec: {
        template: {
          metadata: $.parts.inferenceServerMetadata,
          spec: {
            containers: [
              $.parts.inferenceServerContainer,
            ],
            imagePullSecrets: [
              {
                name: "ngc",
              },
            ],
          },
        },
      },
    },  // inferenceServerDeployment

    inferenceService: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: $.params.labels,
        name: $.params.name,
        namespace: $.params.namespace,
      },
      spec: {
        ports: [
          {
            name: "http-inference-server",
            port: 8000,
            targetPort: 8000,
          },
          {
            name: "grpc-inference-server",
            port: 8001,
            targetPort: 8001,
          },
          {
            name: "metrics-inference-server",
            port: 8002,
            targetPort: 8002,
          },
        ],
        selector: $.params.labels,
        type: $.params.serviceType,
      },
    },  // inferenceService
  },  // parts
}
