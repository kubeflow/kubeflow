// jsonnet tests for the manifests.
// You can run the test as follows
// jsonnet eval ./kubeflow/pytorch-job/tests/pytorch-job_test.jsonnet --jpath ./kubeflow --jpath ./testing/workflows/lib/v1.7.0/

local pyjob = import "../pytorch-operator.libsonnet";
local testSuite = import "kubeflow/common/testsuite.libsonnet";
local params = {
  image: "pyControllerImage",
  deploymentScope: "cluster",
  deploymentNamespace: "null",
  pyjobVersion: "v1beta2",
};

local env = {
  namespace: "test-kf-001",
};

local pyjobCrd = pyjob.parts(params, env).crdV1beta2;

local pytorchJobDeploy = pyjob.parts(params, env).pytorchJobDeploy;

local expectedCrd = {
  apiVersion: "apiextensions.k8s.io/v1beta1",
  kind: "CustomResourceDefinition",
  metadata: {
    name: "pytorchjobs.kubeflow.org",
  },
  spec: {
    group: "kubeflow.org",
    scope: "Namespaced",
    names: {
      kind: "PyTorchJob",
      plural: "pytorchjobs",
      singular: "pytorchjob",
    },
    subresources: {
      status: {},
    },
    additionalPrinterColumns: [
      {
        JSONPath: ".status.conditions[-1:].type",
        name: "State",
        type: "string",
      },
      {
        JSONPath: ".metadata.creationTimestamp",
        name: "Age",
        type: "date",
      },
    ],
    validation: {
      openAPIV3Schema: {
        properties: {
          spec: {
            properties: {
              pytorchReplicaSpecs: {
                properties: {
                  Master: {
                    properties: {
                      replicas: {
                        minimum: 1,
                        maximum: 1,
                        type: "integer",
                      },
                    },
                  },
                  Worker: {
                    properties: {
                      replicas: {
                        minimum: 1,
                        type: "integer",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    version: "v1beta2",
    versions: [
      {
        name: "v1beta2",
        served: true,
        storage: true,
      },
      {
        name: "v1beta1",
        served: true,
        storage: false,
      },
    ],
  },
};


local testCases = [
  {
    actual: pyjob.parts(params, env).crd,
    expected: expectedCrd,
  },
  {
    actual: pyjob.parts(params, env).pytorchJobDeploy(params.image, params.deploymentScope, params.deploymentNamespace),
    expected: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "pytorch-operator",
        namespace: "test-kf-001",
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              name: "pytorch-operator",
            },
          },
          spec: {
            containers: [
              {
                command: [
                  "/pytorch-operator.v1beta2",
                  "--alsologtostderr",
                  "-v=1",
                ],
                env: [
                  {
                    name: "MY_POD_NAMESPACE",
                    valueFrom: {
                      fieldRef: {
                        fieldPath: "metadata.namespace",
                      },
                    },
                  },
                  {
                    name: "MY_POD_NAME",
                    valueFrom: {
                      fieldRef: {
                        fieldPath: "metadata.name",
                      },
                    },
                  },
                ],
                image: "pyControllerImage",
                name: "pytorch-operator",
                volumeMounts: [
                  {
                    mountPath: "/etc/config",
                    name: "config-volume",
                  },
                ],
              },
            ],
            serviceAccountName: "pytorch-operator",
            volumes: [
              {
                configMap: {
                  name: "pytorch-operator-config",
                },
                name: "config-volume",
              },
            ],
          },
        },
      },
    },
  },
];

testSuite.run(testCases)
