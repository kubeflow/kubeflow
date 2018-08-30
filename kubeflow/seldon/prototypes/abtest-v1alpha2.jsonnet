// @apiVersion 0.1
// @name io.ksonnet.pkg.seldon-abtest-v1alpha2
// @description An AB test between two models for the v1alpha2 CRD (Seldon 0.2.X)
// @shortDescription An AB test between two models
// @param name string Name to give this deployment
// @param imageA string Docker image which contains model A
// @param imageB string Docker image which contains model B
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
                  version: "v2",
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
          ],
          name: params.name,
          replicas: params.replicas,
          graph: {
            name: "random-ab-test",
            endpoint: {},
            implementation: "RANDOM_ABTEST",
            parameters: [
              {
                name: "ratioA",
                value: "0.5",
                type: "FLOAT",
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


k.core.v1.list.new([
  pvcClaim,
  seldonDeployment,
])
