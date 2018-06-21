local k = import "k.libsonnet";

{
  parts:: {
    crd:: {
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

    clusterRole(name):: {
      kind: "ClusterRole",
      apiVersion: "rbac.authorization.k8s.io/v1",
      metadata: {
        name: name,
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
          // This is needed for the launcher Role.
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
          // This is needed for the launcher Role.
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

    serviceAccount(namespace, name):: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: name,
        namespace: namespace,
      },
    },

    clusterRoleBinding(namespace, name):: {
      kind: "ClusterRoleBinding",
      apiVersion: "rbac.authorization.k8s.io/v1",
      metadata: {
        name: name,
        namespace: namespace,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: name,
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: name,
          namespace: namespace,
        },
      ],
    },

    deploy(namespace, name, image, kubectlDeliveryImage, gpusPerNode):: {
      apiVersion: "apps/v1",
      kind: "Deployment",
      metadata: {
        name: name,
        namespace: namespace,
        labels: {
          app: name,
        },
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: name,
          },
        },
        template: {
          metadata: {
            labels: {
              app: name,
            },
          },
          spec: {
            serviceAccountName: name,
            containers: [
              {
                name: "mpi-operator",
                image: image,
                args: [
                  "--gpus-per-node",
                  std.toString(gpusPerNode),
                  "--kubectl-delivery-image",
                  kubectlDeliveryImage,
                ],
                imagePullPolicy: "Always",
              },
            ],
          },
        },
      },
    },
  },
}
