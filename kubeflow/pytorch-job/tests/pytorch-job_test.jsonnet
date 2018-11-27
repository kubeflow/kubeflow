// jsonnet tests for the manifests.
// You can run the test as follows
// jsonnet eval ./kubeflow/pytorch-job/tests/pytorch-job_test.jsonnet --jpath ./kubeflow --jpath ./testing/workflows/lib/v1.7.0/

local pyjob = import "../pytorch-operator.libsonnet";
local paramsv1alpha2 = {
  image: "pyControllerImage",
  deploymentScope:: "cluster",
  deploymentNamespace:: "null",
  pyjobVersion: "v1alpha2",
};
local paramsv1beta1 = {
  image: "pyControllerImage",
  deploymentScope:: "cluster",
  deploymentNamespace:: "null",
  pyjobVersion: "v1beta1",
};

local env = {
  namespace:: "test-kf-001",
};

local pyjobCrdV1alpha2 = pyjob.parts(paramsv1alpha2, env).crdV1alpha2;
local pyjobCrdV1beta = pyjob.parts(paramsv1beta1, env).crdV1beta1;

local pytorchJobDeployV1alpha1 = pyjob.parts(paramsv1alpha2, env).pytorchJobDeployV1alpha1;
local pytorchJobDeployV1beta1 = pyjob.parts(paramsv1beta1, env).pytorchJobDeployV1beta1;

local expectedCrdV1alpha2 = {
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
    version: "v1alpha2",
  },
};

local expectedCrdV1beta1 = {
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
    version: "v1beta1",
  },
};

local testCases = [
  {
    actual: pyjob.parts(paramsv1alpha2, env).crdV1alpha2,
    expected: expectedCrdV1alpha2,
  },
  {
    actual: pyjob.parts(paramsv1alpha2, env).crdV1beta1,
    expected: expectedCrdV1beta1,
  },
  {
    actual: pyjob.parts(paramsv1alpha2, env).pytorchJobDeployV1beta1(paramsv1beta1.image, paramsv1beta1.deploymentScope, paramsv1beta1.deploymentNamespace),
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
                  "/pytorch-operator.v1beta1",
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

local testEqual(x) = x {
  pass: x.actual == x.expected,
};

// For each test case determine whether expected matches equals
local testCasesWithResults = std.map(
  testEqual,
  testCases,
);

// Compute test suite.
local foldResults(left, right) = {
  pass: left.pass && right.pass,
};

local initResult = { pass: true };
local suiteResult = std.foldl(foldResults, testCasesWithResults, initResult);

local testSuite = suiteResult {
  testCases: testCasesWithResults,
};

testSuite
