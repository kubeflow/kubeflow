// jsonnet tests for the manifests.
// You can run the test as follows
// jsonnet eval ./kubeflow/pytorch-job/tests/pytorch-job_test.jsonnet --jpath ./kubeflow --jpath ./testing/workflows/lib/v1.7.0/

local pyjob = import "../pytorch-operator.libsonnet";
local testSuite = import "kubeflow/common/testsuite.libsonnet";
local params = {
  image: "pyControllerImage",
  deploymentScope: "cluster",
  deploymentNamespace: "null",
  pyjobVersion: "v1",
  enableGangScheduling: "true",
  monitoringPort: "8443",
};

local env = {
  namespace: "test-kf-001",
};

local pyjobCrd = pyjob.parts(params, env).crd;

local pytorchJobDeploy = pyjob.parts(params, env).pytorchJobDeploy;

local pytorchJobService = pyjob.parts(params, env).pytorchJobService;

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
    version: "v1",
    versions: [
      {
        name: "v1",
        served: true,
        storage: true,
      },
      {
        name: "v1beta2",
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
    actual: pyjob.parts(params, env).pytorchJobDeploy(params.image,
                                                      params.deploymentScope,
                                                      params.deploymentNamespace,
                                                      params.enableGangScheduling,
                                                      params.monitoringPort),
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
                  "/pytorch-operator.v1",
                  "--alsologtostderr",
                  "-v=1",
                  "--enable-gang-scheduling",
                  "--monitoring-port=8443",
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
              },
            ],
            serviceAccountName: "pytorch-operator",
          },
        },
      },
    },
  },
  {
    actual: pyjob.parts(params, env).pytorchJobService(params.monitoringPort),
    expected: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        annotations: {
          "prometheus.io/scrape": "true",
          "prometheus.io/path": "/metrics",
          "prometheus.io/port": "8443",
        },
        labels: {
          app: "pytorch-operator",
        },
        name: "pytorch-operator",
        namespace: env.namespace,
      },
      spec: {
        ports: [
          {
            name: "monitoring-port",
            port: 8443,
            targetPort: 8443,
          },
        ],
        selector: {
          name: "pytorch-operator",
        },
        type: "ClusterIP",
      },
    },
  },
];

testSuite.run(testCases)
