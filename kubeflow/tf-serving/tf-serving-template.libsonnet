{
  local k = import "k.libsonnet",
  local util = import "kubeflow/tf-serving/util.libsonnet",
  new(_env, _params):: {
    local params = _env + _params {
      namespace: if std.objectHas(_params, "namespace") && _params.namespace != "null" then
        _params.namespace else _env.namespace,
    },
    local namespace = params.namespace,
    local name = params.name,
    local modelServerImage =
      if params.numGpus == "0" then
        params.defaultCpuImage
      else
        params.defaultGpuImage,

    // Optional features.
    // TODO(lunkai): Add Istio
    // TODO(lunkai): Add request logging

    local tfService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: name,
        },
        name: name,
        namespace: namespace,
        annotations: {
          "getambassador.io/config":
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: tfserving-mapping-" + name + "-get",
              "prefix: /models/" + name + "/",
              "rewrite: /",
              "method: GET",
              "service: " + name + "." + namespace + ":8000",
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: tfserving-mapping-" + name + "-post",
              "prefix: /models/" + name + "/",
              "rewrite: /model/" + name + ":predict",
              "method: POST",
              "service: " + name + "." + namespace + ":8000",
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: tfserving-predict-mapping-" + name,
              "prefix: tfserving/models/" + name + "/",
              "rewrite: /v1/models/" + name + ":predict",
              "method: POST",
              "service: " + name + "." + namespace + ":8500",
            ]),
        },  //annotations
      },
      spec: {
        ports: [
          {
            name: "grpc-tf-serving",
            port: 9000,
            targetPort: 9000,
          },
          {
            name: "http-tf-serving-proxy",
            port: 8000,
            targetPort: 8000,
          },
          {
            name: "tf-serving-builtin-http",
            port: 8500,
            targetPort: 8500,
          },
        ],
        selector: {
          app: name,
        },
        type: params.serviceType,
      },
    },  // tfService
    tfService:: tfService,

    local modelServerContainer = {
      command: [
        "/usr/bin/tensorflow_model_server",
      ],
      args: [
        "--port=9000",
        "--rest_api_port=8500",
        "--model_name=" + params.modelName,
        "--model_base_path=" + params.modelBasePath,
      ],
      image: modelServerImage,
      imagePullPolicy: "IfNotPresent",
      name: name,
      ports: [
        {
          containerPort: 9000,
        },
        {
          containerPort: 8500,
        },
      ],
      env: [],
      resources: {
        limits: {
          cpu: "4",
          memory: "4Gi",
        } + if params.numGpus != "0" then {
          "nvidia.com/gpu": params.numGpus,
        } else {},
        requests: {
          cpu: "1",
          memory: "1Gi",
        },
      },
      volumeMounts: [],
    },  // modelServerContainer

    local httpProxyContainer = {
      name: name + "-http-proxy",
      image: params.httpProxyImage,
      imagePullPolicy: "IfNotPresent",
      command: [
        "python",
        "/usr/src/app/server.py",
        "--port=8000",
        "--rpc_port=9000",
        "--rpc_timeout=10.0",
      ],
      env: [],
      ports: [
        {
          containerPort: 8000,
        },
      ],
      resources: {
        requests: {
          memory: "500Mi",
          cpu: "0.5",
        },
        limits: {
          memory: "1Gi",
          cpu: "1",
        },
      },
      securityContext: {
        runAsUser: 1000,
        fsGroup: 1000,
      },
    },  // httpProxyContainer

    local tfDeployment = {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: name,
        },
        name: name,
        namespace: namespace,
      },
      spec: {
        template: {
          metadata: {
            labels: {
              app: name,
            },
          },
          spec: {
            containers: [
              modelServerContainer,
            ] + if util.toBool(params.deployHttpProxy) then [
              httpProxyContainer,
            ] else [],
            volumes: [],
          },
        },
      },
    },  // tfDeployment
    tfDeployment:: tfDeployment,
  },  // new
}
