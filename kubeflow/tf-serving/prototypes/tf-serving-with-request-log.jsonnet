// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-serving-request-log
// @description tf-serving with request logging
// @shortDescription tf-serving with request logging
// @param name string Name to give to each of the components
// @param gcpProject string The gcp project for Bigquery dataset
// @param dataset string The Bigquery dataset
// @param table string The Bigquery table
// @optionalParam modelBasePath string gs://kubeflow-examples-data/mnist The model path
// @optionalParam modelName string mnist The model name

local k = import "k.libsonnet";

local namespace = "kubeflow";
local appName = import "param://name";
local image = "gcr.io/kubeflow-images-public/tf-model-server-cpu:v20180327-995786ec";
local httpProxyImage = "gcr.io/kubeflow-images-public/tf-model-server-http-proxy:v20180723";
local loggingImage = "gcr.io/kubeflow-images-public/tf-model-server-request-logger:v20180723";

local gcpSecretName = "user-gcp-sa";

local service = {
  apiVersion: "v1",
  kind: "Service",
  metadata: {
    labels: {
      app: appName,
    },
    name: appName,
    namespace: namespace,
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
    ],
    selector: {
      app: appName,
    },
    type: "ClusterIP",
  },
};

local configMap = {
  apiVersion: "v1",
  kind: "ConfigMap",
  metadata: {
    name: appName + "fluentd-config",
    namespace: namespace,
  },
  data: {
    "fluent.conf": std.format(|||
      <source>
        @type tail
        path /tmp/logs/request.log
        pos_file /tmp/logs/request.log.pos
        <parse>
          @type json
        </parse>
        tag dummy
      </source>
      <match dummy>
        @type bigquery_insert
        auth_method application_default
        project %s
        dataset %s
        table %s
        fetch_schema true
      </match>
    |||, [params.gcpProject, params.dataset, params.table]),
  },
};

local deployment = {
  apiVersion: "extensions/v1beta1",
  kind: "Deployment",
  metadata: {
    labels: {
      app: appName,
    },
    name: appName,
    namespace: namespace,
  },
  spec: {
    template: {
      metadata: {
        labels: {
          app: appName,
        },
      },
      spec: {
        containers: [
          // ModelServer
          {
            args: [
              "/usr/bin/tensorflow_model_server",
              "--port=9000",
              "--model_name=" + params.modelName,
              "--model_base_path=" + params.modelBasePath,
            ],
            image: image,
            imagePullPolicy: "IfNotPresent",
            name: "model-server",
            ports: [
              {
                containerPort: 9000,
              },
            ],
            resources: {
              limits: {
                cpu: "4",
                memory: "4Gi",
              },
              requests: {
                cpu: "1",
                memory: "1Gi",
              },
            },
          },
          // Http proxy
          {
            name: "http-proxy",
            image: httpProxyImage,
            imagePullPolicy: "Always",
            command: [
              "python",
              "/usr/src/app/server.py",
              "--port=8000",
              "--rpc_port=9000",
              "--rpc_timeout=10.0",
              "--log_request=true",
            ],
            env: [],
            ports: [
              {
                containerPort: 8000,
              },
            ],
            resources: {
              requests: {
                memory: "1Gi",
                cpu: "1",
              },
              limits: {
                memory: "4Gi",
                cpu: "4",
              },
            },
            securityContext: {
              runAsUser: 1000,
              fsGroup: 1000,
            },
            volumeMounts: [
              {
                name: "request-logs",
                mountPath: "/tmp/logs",
              },
            ],
          },
          // TODO(lunkai): use admission controller to inject.
          // Logging container.
          {
            name: "logging",
            image: loggingImage,
            imagePullPolicy: "Always",
            env: [
              { name: "GOOGLE_APPLICATION_CREDENTIALS", value: "/secret/gcp-credentials/key.json" },
            ],
            resources: {
              requests: {
                memory: "250Mi",
                cpu: "0.25",
              },
              limits: {
                memory: "500Mi",
                cpu: "0.5",
              },
            },
            volumeMounts: [
              {
                name: "request-logs",
                mountPath: "/tmp/logs",
              },
              {
                name: "gcp-credentials",
                mountPath: "/secret/gcp-credentials",
              },
              {
                name: "fluentd-config-volume",
                mountPath: "/fluentd/etc/custom",
              },
            ],
          },
        ],
        volumes: [
          {
            name: "gcp-credentials",
            secret: {
              secretName: gcpSecretName,
            },
          },
          {
            name: "request-logs",
            emptyDir: {},
          },
          {
            configMap: {
              name: "fluentd-config",
            },
            name: "fluentd-config-volume",
          },
        ],
      },
    },
  },
};

k.core.v1.list.new([
  service,
  deployment,
  configMap,
])
