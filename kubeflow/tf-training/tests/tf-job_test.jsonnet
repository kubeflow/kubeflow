local tfjob = import "../tf-job-operator.libsonnet";
local paramsv1alpha2 = {
  name:: "tf-job-operator",
  tfJobImage:: "gcr.io/kubeflow-images-public/tf_operator:kubeflow-tf-operator-postsubmit-v2-785f416-272-7f3c",
  tfDefaultImage:: "null",
  deploymentScope:: "cluster",
  deploymentNamespace:: "null",
  tfJobVersion: "v1alpha2",
};
local paramsv1beta1 = {
  name:: "tf-job-operator",
  tfJobImage:: "gcr.io/kubeflow-images-public/tf_operator:kubeflow-tf-operator-postsubmit-v2-785f416-272-7f3c",
  tfDefaultImage:: "null",
  deploymentScope:: "cluster",
  deploymentNamespace:: "null",
  tfJobVersion: "v1beta1",
};
local env = {
  namespace:: "test-kf-001",
};

local tfjobv1alpha2 = tfjob.new(env, paramsv1alpha2);
local tfjobv1beta1 = tfjob.new(env, paramsv1beta1);

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
      scope: "Namespaced",
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
              image: "gcr.io/kubeflow-images-public/tf_operator:kubeflow-tf-operator-postsubmit-v2-785f416-272-7f3c",
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
              image: "gcr.io/kubeflow-images-public/tf_operator:kubeflow-tf-operator-postsubmit-v2-785f416-272-7f3c",
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
  tfjobv1beta1.tfJobCrd,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "tfjobs.kubeflow.org",
    },
    spec: {
      group: "kubeflow.org",
      scope: "Namespaced",
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
      version: "v1beta1",
    },
  }
) &&

std.assertEqual(
  tfjobv1beta1.tfJobDeployment,
  {
    apiVersion: "extensions/v1beta1",
    kind: "Deployment",
    metadata: {
      name: "tf-job-operator-v1beta1",
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
                "/opt/kubeflow/tf-operator.v1beta1",
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
              image: "gcr.io/kubeflow-images-public/tf_operator:kubeflow-tf-operator-postsubmit-v2-785f416-272-7f3c",
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
  tfjobv1beta1.tfUiDeployment,
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
              image: "gcr.io/kubeflow-images-public/tf_operator:kubeflow-tf-operator-postsubmit-v2-785f416-272-7f3c",
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
  tfjobv1beta1.tfUiRole,
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
