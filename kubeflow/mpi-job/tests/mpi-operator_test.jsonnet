// Run following command to test mpi-operator libsonnet
// jsonnet eval ./kubeflow/mpi-job/tests/mpi-operator_test.jsonnet --jpath ./ --jpath ./testing/workflows/lib/v1.7.0

local mpiOperator = import "kubeflow/mpi-job/mpi-operator.libsonnet";

local v1beta1params = {
  name: "mpi-operator-v1beta1",
  image: "mpioperator/mpi-operator:v1beta1",
  kubectlDeliveryImage: "mpioperator/kubectl-delivery:v1beta1",
  gpusPerNode: 4
};

local env = {
  namespace: "kubeflow",
};

local mpiOperatorInstance = mpiOperator.new(env, v1beta1params);

// does it have all and items?
std.assertEqual(
  std.length(mpiOperatorInstance.all),
  5,
) &&

std.assertEqual(
  mpiOperatorInstance.mpiJobCrd,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "mpijobs.kubeflow.org",
    },
    spec: {
      group: "kubeflow.org",
      version: "v1alpha1",
      scope: "Namespaced",
      names: {
        plural: "mpijobs",
        singular: "mpijob",
        kind: "MPIJob",
        shortNames: [
          "mj",
          "mpij",
        ],
      },
      validation: {
        openAPIV3Schema: {
          properties: {
            spec: {
              title: "The MPIJob spec",
              description: "Either `gpus` or `replicas` should be specified, but not both",
              oneOf: [
                {
                  properties: {
                    gpus: {
                      title: "Total number of GPUs",
                      description: "Valid values are 1, 2, 4, or any multiple of 8",
                      oneOf: [
                        {
                          type: "integer",
                          enum: [
                            1,
                            2,
                            4,
                          ],
                        },
                        {
                          type: "integer",
                          multipleOf: 8,
                          minimum: 8,
                        },
                      ],
                    },
                  },
                  required: [
                    "gpus",
                  ],
                },
                {
                  properties: {
                    replicas: {
                      title: "Total number of replicas",
                      description: "The GPU resource limit should be specified for each replica",
                      type: "integer",
                      minimum: 1,
                    },
                  },
                  required: [
                    "replicas",
                  ],
                },
              ],
            },
          },
        },
      },
    },
  },
) &&

std.assertEqual(
  mpiOperatorInstance.serviceAccount,
  {
    apiVersion: "v1",
    kind: "ServiceAccount",
    metadata: {
      name: "mpi-operator-v1beta1",
      namespace: "kubeflow",
    },
  },
) &&

std.assertEqual(
  mpiOperatorInstance.clusterRole,
  {
      kind: "ClusterRole",
      apiVersion: "rbac.authorization.k8s.io/v1",
      metadata: {
        name: "mpi-operator-v1beta1",
      },
      rules: [
        {
          apiGroups: [
            "",
          ],
          resources: [
            "configmaps",
            "serviceaccounts",
          ],
          verbs: [
            "create",
            "list",
            "watch",
          ],
        },
        {
          apiGroups: [
            "",
          ],
          resources: [
            "pods",
          ],
          verbs: [
            "get",
          ],
        },
        {
          apiGroups: [
            "",
          ],
          resources: [
            "pods/exec",
          ],
          verbs: [
            "create",
          ],
        },
        {
          apiGroups: [
            "",
          ],
          resources: [
            "events",
          ],
          verbs: [
            "create",
            "patch",
          ],
        },
        {
          apiGroups: [
            "rbac.authorization.k8s.io",
          ],
          resources: [
            "roles",
            "rolebindings",
          ],
          verbs: [
            "create",
            "list",
            "watch",
          ],
        },
        {
          apiGroups: [
            "apps",
          ],
          resources: [
            "statefulsets",
          ],
          verbs: [
            "create",
            "list",
            "update",
            "watch",
          ],
        },
        {
          apiGroups: [
            "batch",
          ],
          resources: [
            "jobs",
          ],
          verbs: [
            "create",
            "list",
            "update",
            "watch",
          ],
        },
        {
          apiGroups: [
            "policy",
          ],
          resources: [
            "poddisruptionbudgets",
          ],
          verbs: [
            "create",
            "list",
            "update",
            "watch",
          ],
        },
        {
          apiGroups: [
            "apiextensions.k8s.io",
          ],
          resources: [
            "customresourcedefinitions",
          ],
          verbs: [
            "create",
            "get",
          ],
        },
        {
          apiGroups: [
            "kubeflow.org",
          ],
          resources: [
            "mpijobs",
          ],
          verbs: [
            "*",
          ],
        },
      ],
    },
) &&

std.assertEqual(
  mpiOperatorInstance.clusterRoleBinding,
  {
    kind: "ClusterRoleBinding",
    apiVersion: "rbac.authorization.k8s.io/v1",
    metadata: {
      name: "mpi-operator-v1beta1",
      namespace: "kubeflow",
    },
    roleRef: {
      apiGroup: "rbac.authorization.k8s.io",
      kind: "ClusterRole",
      name: "mpi-operator-v1beta1",
    },
    subjects: [
      {
        kind: "ServiceAccount",
        name: "mpi-operator-v1beta1",
        namespace: "kubeflow",
      },
    ],
  },
) &&

std.assertEqual(
  mpiOperatorInstance.deployment,
  {
      apiVersion: "apps/v1",
      kind: "Deployment",
      metadata: {
        name: "mpi-operator-v1beta1",
        namespace: "kubeflow",
        labels: {
          app: "mpi-operator-v1beta1",
        },
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: "mpi-operator-v1beta1",
          },
        },
        template: {
          metadata: {
            labels: {
              app: "mpi-operator-v1beta1",
            },
          },
          spec: {
            serviceAccountName: "mpi-operator-v1beta1",
            containers: [
              {
                name: "mpi-operator",
                image: "mpioperator/mpi-operator:v1beta1",
                args: [
                  "-alsologtostderr",
                  "--gpus-per-node",
                  "4",
                  "--kubectl-delivery-image",
                  "mpioperator/kubectl-delivery:v1beta1",
                ],
                imagePullPolicy: "Always",
              },
            ],
          },
        },
      },
    },
)