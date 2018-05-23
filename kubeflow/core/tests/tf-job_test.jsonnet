local tfjob = import "../tf-job-operator.libsonnet";
local params = {
  namespace:: "test-kf-001",
  cloud:: "azure",
  tfJobImage:: "gcr.io/kubeflow-images-public/tf_operator:v20180226-403",
  tfDefaultImage:: "null",
};

std.assertEqual(
  tfjob.parts(params.namespace).tfJobDeploy(params.tfJobImage),
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
              image: "gcr.io/kubeflow-images-public/tf_operator:v20180226-403",
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
  tfjob.parts(params.namespace).configMap(params.cloud, params.tfDefaultImage),
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
  tfjob.parts(params.namespace).serviceAccount,
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
  tfjob.parts(params.namespace).operatorRole,
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
  tfjob.parts(params.namespace).operatorRoleBinding,
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
  tfjob.parts(params.namespace).crd,
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
)
