// @apiVersion 0.1
// @name io.ksonnet.pkg.seldon-serve-simple-v1alpha1
// @description Serve a single seldon model  for the v1alpha1 CRD (Seldon 0.1.X)
// @shortDescription Serve a single seldon model
// @param name string Name to give this deployment
// @param image string Docker image which contains this model
// @optionalParam replicas number 1 Number of replicas
// @optionalParam endpoint string REST The endpoint type: REST or GRPC
// @optionalParam pvcName string null Name of PVC


local k = import "k.libsonnet";
local endpoint = import "param://endpoint";
local image = import "param://image";
local name = import "param://name";
local pvcName = import "param://pvcName";
local replicas = import "param://replicas";


local pvcClaim = {
  apiVersion: "v1",
  kind: "PersistentVolumeClaim",
  metadata: {
    name: pvcName,
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
};


local seldonDeployment = {
  apiVersion: "machinelearning.seldon.io/v1alpha1",
  kind: "SeldonDeployment",
  metadata: {
    labels: {
      app: "seldon",
    },
    name: name,
    namespace: env.namespace,
  },
  spec: {
    annotations: {
      deployment_version: "v1",
      project_name: name,
    },
    name: name,
    predictors: [
      {
        annotations: {
          predictor_version: "v1",
        },
        componentSpec: {
          spec: {
            containers: [
              {
                image: image,
                imagePullPolicy: "IfNotPresent",
                name: name,
                volumeMounts+: if pvcName != "null" && pvcName != "" then [
                  {
                    mountPath: "/mnt",
                    name: "persistent-storage",
                  },
                ] else [],
              },
            ],
            terminationGracePeriodSeconds: 1,
            volumes+: if pvcName != "null" && pvcName != "" then [
              {
                name: "persistent-storage",
                volumeSource: {
                  persistentVolumeClaim: {
                    claimName: pvcName,
                  },
                },
              },
            ] else [],
          },
        },
        graph: {
          children: [

          ],
          endpoint: {
            type: endpoint,
          },
          name: name,
          type: "MODEL",
        },
        name: name,
        replicas: replicas,
      },
    ],
  },
};

k.core.v1.list.new([
  pvcClaim,
  seldonDeployment,
])
