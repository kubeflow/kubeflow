// @apiVersion 0.1
// @name io.ksonnet.pkg.seldon-mab-v1alpha2
// @description An e-greeey multi-armed bandit solver between two models for the v1alpha2 CRD (Seldon 0.2.X)
// @shortDescription An e-greeey multi-armed bandit for two models
// @param name string Name to give this deployment
// @param imageA string Docker image which contains model A
// @param imageB string Docker image which contains model
// @optionalParam mabImage string seldonio/mab_epsilon_greedy:1.1 image for multi-armed bandit model
// @optionalParam replicas number 1 Number of replicas
// @optionalParam endpointA string REST The endpoint type for modelA : REST or GRPC
// @optionalParam endpointB string REST The endpoint type for modelB: REST or GRPC
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

local seldonDeployment =
  {
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
        project_name: params.name,
        deployment_version: "v1",
      },
      name: params.name,
      predictors: [
        {
          componentSpecs: [
            {
              metadata: {
                labels: {
                  version: "v1",
                },
              },
              spec: {
                containers: [
                  {
                    image: params.imageA,
                    imagePullPolicy: "IfNotPresent",
                    name: "classifier-1",
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
            },
            {
              metadata: {
                labels: {
                  version: "v2",
                },
              },
              spec: {
                containers: [
                  {
                    image: params.imageB,
                    imagePullPolicy: "IfNotPresent",
                    name: "classifier-2",
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
            },
            {
              spec: {
                containers: [
                  {
                    image: params.mabImage,
                    imagePullPolicy: "IfNotPresent",
                    name: "eg-router",
                  },
                ],
                terminationGracePeriodSeconds: 1,
              },
            },
          ],
          name: params.name,
          replicas: params.replicas,
          graph: {
            name: "eg-router",
            type: "ROUTER",
            parameters: [
              {
                name: "n_branches",
                value: "2",
                type: "INT",
              },
              {
                name: "epsilon",
                value: "0.2",
                type: "FLOAT",
              },
              {
                name: "verbose",
                value: "1",
                type: "BOOL",
              },
            ],
            children: [
              {
                name: "classifier-1",
                endpoint: {
                  type: params.endpointA,
                },
                type: "MODEL",
                children: [],
              },
              {
                name: "classifier-2",
                endpoint: {
                  type: params.endpointB,
                },
                type: "MODEL",
                children: [],
              },
            ],
          },
        },
      ],
    },
  };


if params.pvcName == "null" then k.core.v1.list.new([seldonDeployment]) else k.core.v1.list.new([pvcClaim, seldonDeployment])
