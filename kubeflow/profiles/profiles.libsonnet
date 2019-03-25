{
  local util = import "kubeflow/common/util.libsonnet",

  new(_env, _params):: {
    local params = _params + _env,

    local profilesCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "profiles.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        version: "v1alpha1",
        scope: "Cluster",
        names: {
          plural: "profiles",
          singular: "profile",
          kind: "Profile",
          shortNames: [
            "prf",
          ],
        },
        validation: {
          openAPIV3Schema: {
            properties: {
              apiVersion: {
                type: "string",
              },
              kind: {
                type: "string",
              },
              metadata: {
                type: "object",
              },
              spec: {
                type: "object",
                properties: {
                  namespace: {
                    type: "string",
                  },
                  owner: {
                    type: "object",
                    required: [
                      "kind",
                      "name",
                    ],
                    properties: {
                      apiGroup: {
                        type: "string",
                      },
                      kind: {
                        enum: [
                          "ServiceAccount",
                          "User",
                        ],
                      },
                      namespace: {
                        type: "string",
                      },
                      name: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              status: {
                properties: {
                  observedGeneration: {
                    type: "integer",
                    format: "int64",
                  },
                },
                type: "object",
              },
            },
          },
        },
      },
    },
    profilesCRD:: profilesCRD,

    local profilesService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: "profiles",
        namespace: params.namespace,
      },
      spec: {
        selector: {
          app: "profiles",
        },
        ports: [
          {
            port: 443,
          },
        ],
      },
    },
    profilesService:: profilesService,

    local profilesRole = {
      apiVersion: "rbac.authorization.k8s.io/v1",
      kind: "Role",
      metadata: {
        name: "profiles",
        namespace: params.namespace,
      },
      rules: [
        {
          apiGroups: [
            "",
          ],
          resources: [
            "namespaces",
          ],
          verbs: [
            "*",
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
            "*",
          ],
        },
        {
          apiGroups: [
            "kubeflow.org",
          ],
          resources: [
            "profiles",
          ],
          verbs: [
            "*",
          ],
        },
      ],
    },
    profilesRole:: profilesRole,

    local serviceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        labels: {
          app: "profiles",
        },
        name: "profiles",
        namespace: params.namespace,
      },
    },
    serviceAccount:: serviceAccount,

    local roleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1",
      kind: "RoleBinding",
      metadata: {
        name: "profiles",
        namespace: params.namespace,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "Role",
        name: "profiles",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "profiles",
          namespace: params.namespace,
        },
      ],
    },
    roleBinding:: roleBinding,

    local profilesDeployment = {
      apiVersion: "apps/v1",
      kind: "Deployment",
      metadata: {
        name: "profiles",
        namespace: params.namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            app: "profiles",
          },
        },
        template: {
          metadata: {
            labels: {
              app: "profiles",
            },
          },
          spec: {
            serviceAccountName: "profiles",
            containers: [
              {
                name: "manager",
                image: params.image,
                imagePullPolicy: "Always",
                command: [
                  "/manager",
                ],
              },
            ],
          },
        },
      },
    },
    profilesDeployment:: profilesDeployment,

    local profileClusterRoleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1",
      kind: "ClusterRoleBinding",
      metadata: {
        name: "profile-controller-cluster-role-binding",
      },
      roleRef: {
        kind: "ClusterRole",
        name: "cluster-admin",
        apiGroup: "rbac.authorization.k8s.io",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "profiles",
          namespace: params.namespace,
        },
      ],
    },
    profileClusterRoleBinding:: profileClusterRoleBinding,

    parts:: self,
    local all = [
      self.profilesCRD,
      self.profilesService,
      self.profilesRole,
      self.profilesDeployment,
      self.serviceAccount,
      self.roleBinding,
      self.profileClusterRoleBinding,
    ],
    all:: all,

    list(obj=self.all):: util.list(obj),
  },
}
