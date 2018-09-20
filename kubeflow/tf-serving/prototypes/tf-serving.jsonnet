// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-serving-template
// @description TensorFlow serving
// @shortDescription A TensorFlow serving deployment
// @param name string Name to give to each of the components
// @optionalPAram modelName string model The model name
// @optionalParam namespace string kubeflow The namespace
// @optionalParam numGpus string 0 Number of gpus to use
// @optionalParam deployHttpProxy string false Whether to deploy http proxy
// @optionalParam modelBasePath string gs://kubeflow-examples-data/mnist The model path
// @optionalParam modelName string mnist The model name
// @optionalParam s3Enable string false Whether to enable S3
// @optionalParam defaultCpuImage string tensorflow/serving:1.8.0 The default model server image (cpu)
// @optionalParam defaultGpuImage string tensorflow/serving:1.10.0-gpu The default model server image (gpu)
// @optionalParam httpProxyImage string gcr.io/kubeflow-images-public/tf-model-server-http-proxy:v20180723 Http proxy image

local k = import "k.libsonnet";
local util = import "kubeflow/tf-serving/util.libsonnet";

// Common section. Please cusomize as needed.
local namespace = params.namespace;
local name = params.modelName;
local appName = params.name;
local numGpus = std.parseInt(params.numGpus);
local modelServerImage =
  if numGpus == 0 then
    params.defaultCpuImage
  else
    params.defaultGpuImage;
local httpProxyImage = params.httpProxyImage;

// Optional customization.
// GCP credentials.
local gcpParams = {
  // If not empty, insert the secret credential.
  gcpCredentialSecretName: "",
} + params;

// Parameters that control S3 access. Need to set params.s3Enable to true
local s3params = {
  //  Name of the k8s secrets containing S3 credentials
  s3SecretName: "",
  // Name of the key in the k8s secret containing AWS_ACCESS_KEY_ID.
  s3SecretAccesskeyidKeyName: "AWS_ACCESS_KEY_ID",

  // Name of the key in the k8s secret containing AWS_SECRET_ACCESS_KEY.
  s3SecretSecretaccesskeyKeyName: "AWS_SECRET_ACCESS_KEY",

  // S3 region
  s3AwsRegion: "us-west-1",

  // TODO(jlewi): We should use util.toBool to automatically conver to actual boolean values.
  // The use of strings is left over from when they were prototype parameters which only supports string type.
  // true Whether or not to use https for S3 connections
  s3UseHttps: "true",

  // Whether or not to verify https certificates for S3 connections
  s3VerifySsl: "true",

  // URL for your s3-compatible endpoint.
  s3Endpoint: "http://s3.us-west-1.amazonaws.com,",
} + params;

local s3Env = [
  { name: "AWS_ACCESS_KEY_ID", valueFrom: { secretKeyRef: { name: s3params.s3SecretName, key: s3params.s3SecretAccesskeyidKeyName } } },
  { name: "AWS_SECRET_ACCESS_KEY", valueFrom: { secretKeyRef: { name: s3params.s3SecretName, key: s3params.s3SecretSecretaccesskeyKeyName } } },
  { name: "AWS_REGION", value: s3params.s3AwsRegion },
  { name: "S3_REGION", value: s3params.s3AwsRegion },
  { name: "S3_USE_HTTPS", value: s3params.s3UseHttps },
  { name: "S3_VERIFY_SSL", value: s3params.s3VerifySsl },
  { name: "S3_ENDPOINT", value: s3params.s3Endpoint },
];

// Optional features.
// TODO(lunkai): Add Istio
// TODO(lunkai): Add request logging

local service = {
  apiVersion: "v1",
  kind: "Service",
  metadata: {
    labels: {
      app: appName,
    },
    name: appName,
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
    ],
    selector: {
      app: appName,
    },
    type: "ClusterIP",
  },
};  // service

local modelServerContainer = {
  args: [
    "/usr/bin/tensorflow_model_server",
    "--port=9000",
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
  ],
  env: []
       + if util.toBool(params.s3Enable) then s3Env else []
                                                         + if gcpParams.gcpCredentialSecretName != "" then
                                                           [{ name: "GOOGLE_APPLICATION_CREDENTIALS", value: "/secret/gcp-credentials/key.json" }] else [],
  resources: {
    limits: {
      cpu: "4",
      memory: "4Gi",
    } + if numGpus > 0 then {
      "nvidia.com/gpu": params.numGpus,
    } else {},
    requests: {
      cpu: "1",
      memory: "1Gi",
    },
  },
  volumeMounts: []
                + if gcpParams.gcpCredentialSecretName != "" then
                  [{
                    name: "gcp-credentials",
                    mountPath: "/secret/gcp-credentials",
                  }] else [],
};  // modelServerContainer

local httpProxyContainer = {
  name: name + "-http-proxy",
  image: httpProxyImage,
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
};  // httpProxyContainer

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
          modelServerContainer,
        ] + if util.toBool(params.deployHttpProxy) then [
          httpProxyContainer,
        ] else [],
        volumes: []
                 + if gcpParams.gcpCredentialSecretName != "" then
                   [{
                     name: "gcp-credentials",
                     secret: {
                       secretName: gcpParams.gcpCredentialSecretName,
                     },
                   }] else [],
      },
    },
  },
};  // deployment

k.core.v1.list.new([
  service,
  deployment,
])
