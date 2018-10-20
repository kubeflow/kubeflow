local tfjob = import "../tf-job-operator.libsonnet";
local paramsv1alpha1 = {
  name:: "tf-job-operator",
  tfJobImage:: "gcr.io/kubeflow-images-public/tf_operator:v0.3.0",
  tfDefaultImage:: "null",
  deploymentScope:: "cluster",
  deploymentNamespace:: "null",
  tfJobVersion: "v1alpha1",
};
local paramsv1alpha2 = {
  name:: "tf-job-operator",
  tfJobImage:: "gcr.io/kubeflow-images-public/tf_operator:v0.3.0",
  tfDefaultImage:: "null",
  deploymentScope:: "cluster",
  deploymentNamespace:: "null",
  tfJobVersion: "v1alpha2",
};
local env = {
  namespace:: "test-kf-001",
};

local tfjobv1alpha1 = tfjob.new(env, paramsv1alpha1);
local tfjobv1alpha2 = tfjob.new(env, paramsv1alpha2);

std.assertEqual(
  tfjobv1alpha1.tfJobDeployment,
  {
    apiVersion: "extensions/v1beta1",
    kind: "Deployment",
    metadata: {
      name: "tf-job-operator",
      namespace: "test-kf-001",
    },
    spec: {
      replicas: 1,
      template: {
        metadata: {
          labels: {
            name: "tf-job-operator",
          },
        },
        spec: {
          containers: [
            {
              command: [
                "/opt/mlkube/tf-operator",
                "--controller-config-file=/etc/config/controller_config_file.yaml",
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
              image: "gcr.io/kubeflow-images-public/tf_operator:v0.3.0",
              name: "tf-job-operator",
              volumeMounts: [
                {
                  mountPath: "/etc/config",
                  name: "config-volume",
                },
              ],
            },
          ],
          serviceAccountName: "tf-job-operator",
          volumes: [
            {
              configMap: {
                name: "tf-job-operator-config",
              },
              name: "config-volume",
            },
          ],
        },
      },
    },
  }
) &&

std.assertEqual(
  tfjobv1alpha1.tfConfigMap,
  {
    apiVersion: "v1",
    data: {
      "controller_config_file.yaml": '{\n    "grpcServerFilePath": "/opt/mlkube/grpc_tensorflow_server/grpc_tensorflow_server.py"\n}',
    },
    kind: "ConfigMap",
    metadata: {
      name: "tf-job-operator-config",
      namespace: "test-kf-001",
    },
  }
) &&

std.assertEqual(
  tfjobv1alpha1.tfServiceAccount,
  {
    apiVersion: "v1",
    kind: "ServiceAccount",
    metadata: {
      labels: {
        app: "tf-job-operator",
      },
      name: "tf-job-operator",
      namespace: "test-kf-001",
    },
  }
) &&

std.assertEqual(
  tfjobv1alpha1.tfOperatorRole,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "ClusterRole",
    metadata: {
      labels: {
        app: "tf-job-operator",
      },
      name: "tf-job-operator",
    },
    rules: [
      {
        apiGroups: [
          "tensorflow.org",
          "kubeflow.org",
        ],
        resources: [
          "tfjobs",
        ],
        verbs: [
          "*",
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
          "*",
        ],
      },
      {
        apiGroups: [
          "storage.k8s.io",
        ],
        resources: [
          "storageclasses",
        ],
        verbs: [
          "*",
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
          "*",
        ],
      },
      {
        apiGroups: [
          "",
        ],
        resources: [
          "configmaps",
          "pods",
          "services",
          "endpoints",
          "persistentvolumeclaims",
          "events",
        ],
        verbs: [
          "*",
        ],
      },
      {
        apiGroups: [
          "apps",
          "extensions",
        ],
        resources: [
          "deployments",
        ],
        verbs: [
          "*",
        ],
      },
    ],
  }
) &&

std.assertEqual(
  tfjobv1alpha1.tfOperatorRoleBinding,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "ClusterRoleBinding",
    metadata: {
      labels: {
        app: "tf-job-operator",
      },
      name: "tf-job-operator",
    },
    roleRef: {
      apiGroup: "rbac.authorization.k8s.io",
      kind: "ClusterRole",
      name: "tf-job-operator",
    },
    subjects: [
      {
        kind: "ServiceAccount",
        name: "tf-job-operator",
        namespace: "test-kf-001",
      },
    ],
  }
) &&

std.assertEqual(
  tfjobv1alpha1.tfJobCrd,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "tfjobs.kubeflow.org",
    },
    spec: {
      group: "kubeflow.org",
      names: {
        kind: "TFJob",
        plural: "tfjobs",
        singular: "tfjob",
      },
      version: "v1alpha1",
    },
  }
) &&

std.assertEqual(
  tfjobv1alpha2.tfJobCrd,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "tfjobs.kubeflow.org",
    },
    spec: {
      group: "kubeflow.org",
      names: {
        kind: "TFJob",
        plural: "tfjobs",
        singular: "tfjob",
      },
      validation: {
        openAPIV3Schema: {
          properties: {
            spec: {
              properties: {
                tfReplicaSpecs: {
                  properties: {
                    Chief: {
                      properties: {
                        replicas: {
                          maximum: 1,
                          minimum: 1,
                          type: "integer",
                        },
                      },
                    },
                    PS: {
                      properties: {
                        replicas: {
                          minimum: 1,
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
  }
) &&

std.assertEqual(
  tfjobv1alpha2.tfJobDeployment,
  {
    apiVersion: "extensions/v1beta1",
    kind: "Deployment",
    metadata: {
      name: "tf-job-operator-v1alpha2",
      namespace: "test-kf-001",
    },
    spec: {
      replicas: 1,
      template: {
        metadata: {
          labels: {
            name: "tf-job-operator",
          },
        },
        spec: {
          containers: [
            {
              command: [
                "/opt/kubeflow/tf-operator.v2",
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
              image: "gcr.io/kubeflow-images-public/tf_operator:v0.3.0",
              name: "tf-job-operator",
              volumeMounts: [
                {
                  mountPath: "/etc/config",
                  name: "config-volume",
                },
              ],
            },
          ],
          serviceAccountName: "tf-job-operator",
          volumes: [
            {
              configMap: {
                name: "tf-job-operator-config",
              },
              name: "config-volume",
            },
          ],
        },
      },
    },
  }
) &&

std.assertEqual(
  tfjobv1alpha2.tfUiDeployment,
  {
    apiVersion: "extensions/v1beta1",
    kind: "Deployment",
    metadata: {
      name: "tf-job-dashboard",
      namespace: "test-kf-001",
    },
    spec: {
      template: {
        metadata: {
          labels: {
            name: "tf-job-dashboard",
          },
        },
        spec: {
          containers: [
            {
              command: [
                "/opt/tensorflow_k8s/dashboard/backend",
              ],
              env: [
                {
                  name: "KUBEFLOW_NAMESPACE",
                  valueFrom: {
                    fieldRef: {
                      fieldPath: "metadata.namespace",
                    },
                  },
                },
              ],
              image: "gcr.io/kubeflow-images-public/tf_operator:v0.3.0",
              name: "tf-job-dashboard",
              ports: [
                {
                  containerPort: 8080,
                },
              ],
            },
          ],
          serviceAccountName: "tf-job-dashboard",
        },
      },
    },
  }
) &&

std.assertEqual(
  tfjobv1alpha2.tfUiRole,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "ClusterRole",
    metadata: {
      labels: {
        app: "tf-job-dashboard",
      },
      name: "tf-job-dashboard",
    },
    rules: [
      {
        apiGroups: [
          "tensorflow.org",
          "kubeflow.org",
        ],
        resources: [
          "tfjobs",
        ],
        verbs: [
          "*",
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
          "*",
        ],
      },
      {
        apiGroups: [
          "storage.k8s.io",
        ],
        resources: [
          "storageclasses",
        ],
        verbs: [
          "*",
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
          "*",
        ],
      },
      {
        apiGroups: [
          "",
        ],
        resources: [
          "configmaps",
          "pods",
          "services",
          "endpoints",
          "persistentvolumeclaims",
          "events",
          "pods/log",
          "namespaces",
        ],
        verbs: [
          "*",
        ],
      },
      {
        apiGroups: [
          "apps",
          "extensions",
        ],
        resources: [
          "deployments",
        ],
        verbs: [
          "*",
        ],
      },
    ],
  }
)

&&

std.assertEqual(
  tfjobv1alpha1.tfUiRoleBinding,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "ClusterRoleBinding",
    metadata: {
      labels: {
        app: "tf-job-dashboard",
      },
      name: "tf-job-dashboard",
    },
    roleRef: {
      apiGroup: "rbac.authorization.k8s.io",
      kind: "ClusterRole",
      name: "tf-job-dashboard",
    },
    subjects: [
      {
        kind: "ServiceAccount",
        name: "tf-job-dashboard",
        namespace: "test-kf-001",
      },
    ],
  }
)
