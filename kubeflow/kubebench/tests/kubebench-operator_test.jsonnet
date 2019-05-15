// jsonnet tests for the manifests.
// You can run the test as follows
// jsonnet eval ./kubeflow/kubebench/tests/kubebench-operator_test.jsonnet --jpath ./kubeflow --jpath ./testing/workflows/lib/v1.7.0/

local testSuite = import "kubeflow/common/testsuite.libsonnet";
local kubebenchOperator = import "../kubebench-operator.libsonnet";

local params = {
  name: "kubebench-operator",
  image: "gcr.io/kubeflow-images-public/kubebench/kubebench-operator:v0.4.0",
};
local env = {
  namespace: "kftest",
};

local kbOperator = kubebenchOperator.new(params, env);


local testCases = [
  {
    actual: kbOperator.kubebenchCRD,
    expected: {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "kubebenchjobs.kubebench.operator",
      },
      spec: {
        group: "kubebench.operator",
        version: "v1",
        names: {
          kind: "KubebenchJob",
          plural: "kubebenchjobs",
        },
        scope: "Namespaced",
      },
    },
  },
  {
    actual: kbOperator.deployment,
    expected: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "kubebench-operator",
        namespace: "kftest",
      },
      spec: {
        selector: {
          matchLabels: {
            app: "kubebench-operator",
          },
        },
        template: {
          metadata: {
            labels: {
              app: "kubebench-operator",
            },
          },
          spec: {
            containers: [
              {
                name: "kubebench-operator",
                image: "gcr.io/kubeflow-images-public/kubebench/kubebench-operator:v0.4.0",
              },
            ],
            seviceAccountName: "kubebench-operator",
          },
        },
      },
    }
  },
  {
    actual: kbOperator.serviceAccount,
    expected: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "default",
        namespace: "kftest",
      },
    }
  },
  {
    actual: kbOperator.clusterRole,
    expected: {
      kind: "ClusterRole",
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      metadata: {
        name: "kubebench-operator",
      },
      rules: [
        {
          apiGroups: [
            "kubebench.operator",
          ],
          resources: [
            "kubebenchjobs.kubebench.operator",
            "kubebenchjobs",
          ],
          verbs: [
            "create",
            "update",
            "get",
            "list",
            "watch",
          ],
        },
        {
          apiGroups: [
            "",
          ],
          resources: [
            "configmaps",
            "pods",
            "pods/exec",
            "services",
            "endpoints",
            "persistentvolumeclaims",
            "events",
            "secrets",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "kubeflow.org",
          ],
          resources: [
            "tfjobs",
            "pytorchjobs",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "argoproj.io",
          ],
          resources: [
            "workflows",
          ],
          verbs: [
            "*",
          ],
        },
      ],
    },
  },
  {
    actual: kbOperator.clusterRoleBinding,
    expected: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        name: "kubebench-operator",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "kubebench-operator",
      },
      subjects:
        [
          {
            kind: "ServiceAccount",
            name: "default",
            namespace: "kftest",
          },
        ],
    },
  },
];

testSuite.run(testCases)
