{
  local util = import "kubeflow/core/util.libsonnet",

  new(_env, _params):: {
    local params = _env + _params,

    local projectsCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "projects.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        version: "v1alpha1",
        scope: "Namespaced",
        names: {
          plural: "projects",
          singular: "project",
          kind: "Project",
          shortNames: [
            "prj",
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
                  selector: {
                    type: "object",
                  },
                  template: {
                    type: "object",
                    properties: {
                      metadata: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                          },
                        },
                      },
                      spec: {
                        type: "object",
                        properties: {
                          namespace: {
                            type: "string",
                          },
                          owner: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                },
              },
              status: {
                properties: {
                  observedGeneration: {
                    type: "int64",
                  },
                },
                type: "object",
              },
            },
          },
        },
      },
    },
    projectsCRD:: projectsCRD,

    local workspacesCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "workspaces.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        version: "v1alpha1",
        scope: "Namespaced",
        names: {
          plural: "workspaces",
          singular: "workspace",
          kind: "Workspace",
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
                  selector: {
                    type: "object",
                  },
                  namespace: {
                    type: "string",
                  },
                  owner: {
                    type: "string",
                  },
                },
              },
              status: {
                properties: {
                  observedGeneration: {
                    type: "int64",
                  },
                },
                type: "object",
              },
            },
          },
        },
      },
    },
    workspacesCRD:: workspacesCRD,

    local permissionsCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "permissions.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        version: "v1alpha1",
        scope: "Namespaced",
        names: {
          plural: "permissions",
          singular: "permission",
          kind: "Permission",
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
                  selector: {
                    type: "object",
                  },
                  owner: {
                    type: "string",
                  },
                },
              },
              status: {
                properties: {
                  observedGeneration: {
                    type: "int64",
                  },
                },
                type: "object",
              },
            },
          },
        },
      },
    },
    permissionsCRD:: permissionsCRD,

    local projectsService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: "projects",
        namespace: params.namespace,
      },
      spec: {
        selector: {
          app: "projects",
        },
        ports: [
          {
            port: 80,
            targetPort: 8080,
          },
        ],
      },
    },
    projectsService:: projectsService,

    local syncProject =
      |||
        function(request) {
          local apiVersion = "kubeflow.org/v1alpha1",
          local template = request.parent.spec.template,
          local children = [{
            apiVersion: apiVersion,
            kind: "Workspace",
            metadata: {
              name: template.metadata.name,
              namespace: request.parent.metadata.namespace,
            },
            spec: {
              namespace: template.spec.namespace,
              owner: template.spec.owner,
            },
          },],
          children: children,
          status: {
            phase: "Active",
            conditions: [{
              type: "Ready"
            },],
            created: true,
            //debug
            request_parent: request.parent,
            request_children: request.children,
          },
        }
      |||,

    local syncWorkspace =
      |||
        function(request) {
          local params = %(params)s,
          local children = [
            {
              apiVersion: "v1",
              kind: "Namespace",
              metadata: {
                name: request.parent.spec.namespace,
                labels: {
                  app: request.parent.spec.namespace,
                },
              },
              status: {
                phase: "Pending",
              },
            },
            {
              apiVersion: 'kubeflow.org/v1alpha1',
              kind: 'Permission',
              metadata: {
                name: 'permission',
                namespace: request.parent.spec.namespace,
              },
              spec: {
                owner: request.parent.spec.owner,
              },
            },
          ],
          children: children,
          status: {
            phase: "Active",
            conditions: [{
              type: "Ready",
            }],
            created: true,
            //debug
            request_parent: request.parent,
            request_children: request.children,
          },
        }
      ||| %
      {
        params: std.manifestJsonEx(params, "  "),
      },

    local syncPermission =
      |||
        function(request) {
          local params = %(params)s,
          local apiVersion = "kubeflow.org/v1alpha1",
          local template = request.parent.spec.template,
          local children = [
            {
              apiVersion: "rbac.authorization.k8s.io/v1",
              kind: "Role",
              metadata: {
                name: "edit",
                namespace: request.parent.metadata.namespace,
              },
              rules: [
                {
                  apiGroups: [
                    "metacontroller.k8s.io",
                  ],
                  resources: [
                    "compositecontrollers",
                    "decoratecontrollers",
                  ],
                  verbs: [
                    "create",
                    "delete",
                    "get",
                    "list",
                    "patch",
                    "update",
                    "watch",
                  ],
                },
                {
                  apiGroups: [
                    "kubeflow.org",
                  ],
                  resources: [
                    "projects",
                    "workspaces",
                    "permissions",
                  ],
                  verbs: [
                    "get",
                    "list",
                    "watch",
                    "create",
                  ],
                },
                {
                  apiGroups: [
                    "app.k8s.io",
                  ],
                  resources: [
                    "applications",
                    "apps",
                  ],
                  verbs: [
                    "create",
                    "delete",
                    "deletecollection",
                    "get",
                    "list",
                    "patch",
                    "update",
                    "watch",
                  ],
                },
                {
                  apiGroups: [
                    "",
                  ],
                  resources: [
                    "pods",
                    "pods/attach",
                    "pods/exec",
                    "pods/portforward",
                    "pods/proxy",
                  ],
                  verbs: [
                    "create",
                    "delete",
                    "deletecollection",
                    "get",
                    "list",
                    "patch",
                    "update",
                    "watch",
                  ],
                },
                {
                  apiGroups: [
                    "",
                  ],
                  resources: [
                    "configmaps",
                    "endpoints",
                    "persistentvolumeclaims",
                    "replicationcontrollers",
                    "replicationcontrollers/scale",
                    "secrets",
                    "serviceaccounts",
                    "services",
                    "services/proxy",
                  ],
                  verbs: [
                    "create",
                    "delete",
                    "deletecollection",
                    "get",
                    "list",
                    "patch",
                    "update",
                    "watch",
                  ],
                },
                {
                  apiGroups: [
                    "",
                  ],
                  resources: [
                    "bindings",
                    "events",
                    "limitranges",
                    "namespaces/status",
                    "pods/log",
                    "pods/status",
                    "replicationcontrollers/status",
                    "resourcequotas",
                    "resourcequotas/status",
                  ],
                  verbs: [
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
                    "namespaces",
                  ],
                  verbs: [
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
                    "serviceaccounts",
                  ],
                  verbs: [
                    "impersonate",
                  ],
                },
                {
                  apiGroups: [
                    "apps",
                  ],
                  resources: [
                    "daemonsets",
                    "deployments",
                    "deployments/rollback",
                    "deployments/scale",
                    "replicasets",
                    "replicasets/scale",
                    "statefulsets",
                  ],
                  verbs: [
                    "create",
                    "delete",
                    "deletecollection",
                    "get",
                    "list",
                    "patch",
                    "update",
                    "watch",
                  ],
                },
                {
                  apiGroups: [
                    "autoscaling",
                  ],
                  resources: [
                    "horizontalpodautoscalers",
                  ],
                  verbs: [
                    "create",
                    "delete",
                    "deletecollection",
                    "get",
                    "list",
                    "patch",
                    "update",
                    "watch",
                  ],
                },
                {
                  apiGroups: [
                    "batch",
                  ],
                  resources: [
                    "cronjobs",
                    "jobs",
                  ],
                  verbs: [
                    "create",
                    "delete",
                    "deletecollection",
                    "get",
                    "list",
                    "patch",
                    "update",
                    "watch",
                  ],
                },
                {
                  apiGroups: [
                    "extensions",
                  ],
                  resources: [
                    "daemonsets",
                    "deployments",
                    "deployments/rollback",
                    "deployments/scale",
                    "ingresses",
                    "networkpolicies",
                    "replicasets",
                    "replicasets/scale",
                    "replicationcontrollers/scale",
                  ],
                  verbs: [
                    "create",
                    "delete",
                    "deletecollection",
                    "get",
                    "list",
                    "patch",
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
                    "delete",
                    "deletecollection",
                    "get",
                    "list",
                    "patch",
                    "update",
                    "watch",
                  ],
                },
                {
                  apiGroups: [
                    "networking.k8s.io",
                  ],
                  resources: [
                    "networkpolicies",
                  ],
                  verbs: [
                    "create",
                    "delete",
                    "deletecollection",
                    "get",
                    "list",
                    "patch",
                    "update",
                    "watch",
                  ],
                },
              ],
            },
            {
              apiVersion: "rbac.authorization.k8s.io/v1",
              kind: "RoleBinding",
              metadata: {
                name: request.parent.spec.owner,
                namespace: request.parent.metadata.namespace,
              },
              roleRef: {
                apiGroup: "rbac.authorization.k8s.io",
                kind: "Role",
                name: "edit",
              },
              subjects: [{
                kind: "ServiceAccount",
                name: request.parent.spec.owner,
                namespace: params.namespace,
              },],
            },
          ],
          children: children,
          status: {
            phase: "Active",
            conditions: [{
              type: "Ready"
            },],
            created: true,
            //debug
            request_parent: request.parent,
            request_children: request.children,
          },
        }
      ||| %
      {
        params: std.manifestJsonEx(params, "  "),
      },

    local projectsRole = {
      apiVersion: "rbac.authorization.k8s.io/v1",
      kind: "Role",
      metadata: {
        name: "view",
        namespace: params.namespace,
      },
      rules: [
        {
          apiGroups: [
            "kubeflow.org",
          ],
          resources: [
            "projects",
            "workspaces",
          ],
          verbs: [
            "create",
          ],
        },
        {
          apiGroups: [
            "kubeflow.org",
          ],
          resources: [
            "projects",
          ],
          verbs: [
            "get",
          ],
        },
      ],
    },
    projectsRole:: projectsRole,

    local projectsConfigMap = {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "projects",
        namespace: params.namespace,
      },
      data: {
        "sync-project.jsonnet": syncProject,
        "sync-workspace.jsonnet": syncWorkspace,
        "sync-permission.jsonnet": syncPermission,
      },
    },
    projectsConfigMap:: projectsConfigMap,

    local projectsDeployment = {
      apiVersion: "apps/v1",
      kind: "Deployment",
      metadata: {
        name: "projects",
        namespace: params.namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            app: "projects",
          },
        },
        template: {
          metadata: {
            labels: {
              app: "projects",
            },
          },
          spec: {
            containers: [
              {
                name: "hooks",
                //freeze latest
                image: "metacontroller/jsonnetd@sha256:25c25f217ad030a0f67e37078c33194785b494569b0c088d8df4f00da8fd15a0",
                imagePullPolicy: "Always",
                workingDir: "/opt/projects/hooks",
                volumeMounts: [
                  {
                    name: "hooks",
                    mountPath: "/opt/projects/hooks",
                  },
                ],
              },
            ],
            volumes: [
              {
                name: "hooks",
                configMap: {
                  name: "projects",
                },
              },
            ],
          },
        },
      },
    },
    projectsDeployment:: projectsDeployment,

    local projectsController = {
      apiVersion: "metacontroller.k8s.io/v1alpha1",
      kind: "CompositeController",
      metadata: {
        name: "projects-controller",
      },
      spec: {
        generateSelector: true,
        parentResource: {
          apiVersion: "kubeflow.org/v1alpha1",
          resource: "projects",
        },
        childResources: [
          {
            apiVersion: "kubeflow.org/v1alpha1",
            resource: "workspaces",
          },
        ],
        hooks: {
          sync: {
            webhook: {
              url: "http://projects." + params.namespace + "/sync-project",
            },
          },
        },
      },
    },
    projectsController:: projectsController,

    local workspacesController = {
      apiVersion: "metacontroller.k8s.io/v1alpha1",
      kind: "CompositeController",
      metadata: {
        name: "workspaces-controller",
      },
      spec: {
        generateSelector: true,
        parentResource: {
          apiVersion: "kubeflow.org/v1alpha1",
          resource: "workspaces",
        },
        childResources: [
          {
            apiVersion: "v1",
            resource: "namespaces",
          },
          {
            apiVersion: "kubeflow.org/v1alpha1",
            resource: "permissions",
          },
        ],
        hooks: {
          sync: {
            webhook: {
              url: "http://projects." + params.namespace + "/sync-workspace",
            },
          },
        },
      },
    },
    workspacesController:: workspacesController,

    local permissionsController = {
      apiVersion: "metacontroller.k8s.io/v1alpha1",
      kind: "CompositeController",
      metadata: {
        name: "permissions-controller",
      },
      spec: {
        generateSelector: true,
        parentResource: {
          apiVersion: "kubeflow.org/v1alpha1",
          resource: "permissions",
        },
        childResources: [
          {
            apiVersion: "rbac.authorization.k8s.io/v1",
            resource: "roles",
          },
          {
            apiVersion: "rbac.authorization.k8s.io/v1",
            resource: "rolebindings",
          },
        ],
        hooks: {
          sync: {
            webhook: {
              url: "http://projects." + params.namespace + "/sync-permission",
            },
          },
        },
      },
    },
    permissionsController:: permissionsController,

    parts:: self,
    local all = [
      self.projectsCRD,
      self.workspacesCRD,
      self.permissionsCRD,
      self.projectsService,
      self.projectsRole,
      self.projectsConfigMap,
      self.projectsDeployment,
      self.projectsController,
      self.workspacesController,
      self.permissionsController,
    ],
    all:: all,

    list(obj=self.all):: util.list(obj),
  },
}
