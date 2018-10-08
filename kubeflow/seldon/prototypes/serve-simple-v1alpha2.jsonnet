// @apiVersion 0.1
// @name io.ksonnet.pkg.seldon-serve-simple-v1alpha2
// @description Serve a single seldon model for the v1alpha2 CRD (Seldon 0.2.X)
// @shortDescription Serve a single seldon model
// @param name string Name to give this deployment
// @param image string Docker image which contains this model
// @optionalParam replicas number 1 Number of replicas
// @optionalParam endpoint string REST The endpoint type: REST or GRPC
// @optionalParam pvcName string null Name of PVC
// @optionalParam imagePullSecret string null name of image pull secret

local k = import "k.libsonnet";

local pvcClaim = {
  apiVersion: "v1",
  kind: "PersistentVolumeClaim",
  metadata: {
    name: params.pvcName,
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
  apiVersion: "machinelearning.seldon.io/v1alpha2",
  kind: "SeldonDeployment",
  metadata: {
    labels: {
      app: "seldon",
    },
    name: params.name,
    namespace: env.namespace,
  },
  spec: {
    annotations: {
      deployment_version: "v1",
      project_name: params.name,
    },
    name: params.name,
    predictors: [
      {
        annotations: {
          predictor_version: "v1",
        },
        componentSpecs: [{
          spec: {
            containers: [
              {
                image: params.image,
                imagePullPolicy: "IfNotPresent",
                name: params.name,
                volumeMounts+: if params.pvcName != "null" && params.pvcName != "" then [
                  {
                    mountPath: "/mnt",
                    name: "persistent-storage",
                  },
                ] else [],
              },
            ],
            terminationGracePeriodSeconds: 1,
            imagePullSecrets+: if params.imagePullSecret != "null" && params.imagePullSecret != "" then [
              {
                name: params.imagePullSecret,
              },
            ] else [],
            volumes+: if params.pvcName != "null" && params.pvcName != "" then [
              {
                name: "persistent-storage",
                volumeSource: {
                  persistentVolumeClaim: {
                    claimName: params.pvcName,
                  },
                },
              },
            ] else [],
          },
        }],
        graph: {
          children: [

          ],
          endpoint: {
            type: params.endpoint,
          },
          name: params.name,
          type: "MODEL",
        },
        name: params.name,
        replicas: params.replicas,
      },
    ],
  },
};

if params.pvcName == "null" then k.core.v1.list.new([seldonDeployment]) else k.core.v1.list.new([pvcClaim, seldonDeployment])
