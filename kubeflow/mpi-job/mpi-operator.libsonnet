{
  local k = import "k.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",

  new(_env, _params):: {
    local params = _params + _env,

    local mpiJobCrd = {
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
    mpiJobCrd:: mpiJobCrd,

    local serviceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: params.name,
        namespace: params.namespace,
      },
    },
    serviceAccount:: serviceAccount,

    local clusterRole = {
      kind: "ClusterRole",
      apiVersion: "rbac.authorization.k8s.io/v1",
      metadata: {
        name: params.name,
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
    clusterRole:: clusterRole,

    local clusterRoleBinding = {
      kind: "ClusterRoleBinding",
      apiVersion: "rbac.authorization.k8s.io/v1",
      metadata: {
        name: params.name,
        namespace: params.namespace,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: params.name,
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: params.name,
          namespace: params.namespace,
        },
      ],
    },
    clusterRoleBinding:: clusterRoleBinding,

    local deployment = {
      apiVersion: "apps/v1",
      kind: "Deployment",
      metadata: {
        name: params.name,
        namespace: params.namespace,
        labels: {
          app: params.name,
        },
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: params.name,
          },
        },
        template: {
          metadata: {
            labels: {
              app: params.name,
            },
          },
          spec: {
            serviceAccountName: params.name,
            containers: [
              {
                name: "mpi-operator",
                image: params.image,
                args: [
                  "-alsologtostderr",
                  "--gpus-per-node",
                  std.toString(params.gpusPerNode),
                  "--kubectl-delivery-image",
                  params.kubectlDeliveryImage,
                ],
                imagePullPolicy: "Always",
              },
            ],
          },
        },
      },
    },
    deployment:: deployment,

    parts:: self,
    all:: [
      self.mpiJobCrd,
      self.serviceAccount,
      self.clusterRole,
      self.clusterRoleBinding,
      self.deployment
    ],

    list(obj=self.all):: util.list(obj),
  },
}