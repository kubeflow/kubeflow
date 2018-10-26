local projects = import "kubeflow/projects/projects.libsonnet";

local params = {
  name: "projects",
};
local env = {
  namespace: "kf-001",
};

local instance = projects.new(env, params);

std.assertEqual(
  instance.parts.projectsCRD,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "projects.kubeflow.org",
    },
    spec: {
      group: "kubeflow.org",
      names: {
        kind: "Project",
        plural: "projects",
        shortNames: [
          "prj",
        ],
        singular: "project",
      },
      scope: "Namespaced",
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
              properties: {
                selector: {
                  type: "object",
                },
                template: {
                  properties: {
                    metadata: {
                      properties: {
                        name: {
                          type: "string",
                        },
                      },
                      type: "object",
                    },
                    spec: {
                      properties: {
                        namespace: {
                          type: "string",
                        },
                        owner: {
                          type: "string",
                        },
                      },
                      type: "object",
                    },
                  },
                  type: "object",
                },
              },
              type: "object",
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
      version: "v1alpha1",
    },
  }
) &&

std.assertEqual(
  instance.parts.workspacesCRD,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "workspaces.kubeflow.org",
    },
    spec: {
      group: "kubeflow.org",
      names: {
        kind: "Workspace",
        plural: "workspaces",
        singular: "workspace",
      },
      scope: "Namespaced",
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
              properties: {
                namespace: {
                  type: "string",
                },
                owner: {
                  type: "string",
                },
                selector: {
                  type: "object",
                },
              },
              type: "object",
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
      version: "v1alpha1",
    },
  }
) &&

std.assertEqual(
  instance.parts.permissionsCRD,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "permissions.kubeflow.org",
    },
    spec: {
      group: "kubeflow.org",
      names: {
        kind: "Permission",
        plural: "permissions",
        singular: "permission",
      },
      scope: "Namespaced",
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
              properties: {
                owner: {
                  type: "string",
                },
                selector: {
                  type: "object",
                },
              },
              type: "object",
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
      version: "v1alpha1",
    },
  }
) &&

std.assertEqual(
  instance.parts.projectsService,
  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "projects",
      namespace: "kf-001",
    },
    spec: {
      ports: [
        {
          port: 80,
          targetPort: 8080,
        },
      ],
      selector: {
        app: "projects",
      },
    },
  }
) &&

std.assertEqual(
  instance.parts.projectsRole,
  {
    apiVersion: "rbac.authorization.k8s.io/v1",
    kind: "Role",
    metadata: {
      name: "view",
      namespace: "kf-001",
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
  }
) &&

std.assertEqual(
  instance.parts.projectsConfigMap,
  {
    apiVersion: "v1",
    data: {
      "sync-permission.jsonnet": 'function(request) {\n  local params = {\n  "name": "projects",\n  "namespace": "kf-001"\n},\n  local apiVersion = "kubeflow.org/v1alpha1",\n  local template = request.parent.spec.template,\n  local children = [\n    {\n      apiVersion: "rbac.authorization.k8s.io/v1",\n      kind: "Role",\n      metadata: {\n        name: "edit",\n        namespace: request.parent.metadata.namespace,\n      },\n      rules: [\n        {\n          apiGroups: [\n            "metacontroller.k8s.io",\n          ],\n          resources: [\n            "compositecontrollers",\n            "decoratecontrollers",\n          ],\n          verbs: [\n            "create",\n            "delete",\n            "get",\n            "list",\n            "patch",\n            "update",\n            "watch",\n          ],\n        },\n        {\n          apiGroups: [\n            "kubeflow.org",\n          ],\n          resources: [\n            "projects",\n            "workspaces",\n            "permissions",\n          ],\n          verbs: [\n            "get",\n            "list",\n            "watch",\n            "create",\n          ],\n        },\n        {\n          apiGroups: [\n            "app.k8s.io",\n          ],\n          resources: [\n            "applications",\n            "apps",\n          ],\n          verbs: [\n            "create",\n            "delete",\n            "deletecollection",\n            "get",\n            "list",\n            "patch",\n            "update",\n            "watch",\n          ],\n        },\n        {\n          apiGroups: [\n            "",\n          ],\n          resources: [\n            "pods",\n            "pods/attach",\n            "pods/exec",\n            "pods/portforward",\n            "pods/proxy",\n          ],\n          verbs: [\n            "create",\n            "delete",\n            "deletecollection",\n            "get",\n            "list",\n            "patch",\n            "update",\n            "watch",\n          ],\n        },\n        {\n          apiGroups: [\n            "",\n          ],\n          resources: [\n            "configmaps",\n            "endpoints",\n            "persistentvolumeclaims",\n            "replicationcontrollers",\n            "replicationcontrollers/scale",\n            "secrets",\n            "serviceaccounts",\n            "services",\n            "services/proxy",\n          ],\n          verbs: [\n            "create",\n            "delete",\n            "deletecollection",\n            "get",\n            "list",\n            "patch",\n            "update",\n            "watch",\n          ],\n        },\n        {\n          apiGroups: [\n            "",\n          ],\n          resources: [\n            "bindings",\n            "events",\n            "limitranges",\n            "namespaces/status",\n            "pods/log",\n            "pods/status",\n            "replicationcontrollers/status",\n            "resourcequotas",\n            "resourcequotas/status",\n          ],\n          verbs: [\n            "get",\n            "list",\n            "watch",\n          ],\n        },\n        {\n          apiGroups: [\n            "",\n          ],\n          resources: [\n            "namespaces",\n          ],\n          verbs: [\n            "get",\n            "list",\n            "watch",\n          ],\n        },\n        {\n          apiGroups: [\n            "",\n          ],\n          resources: [\n            "serviceaccounts",\n          ],\n          verbs: [\n            "impersonate",\n          ],\n        },\n        {\n          apiGroups: [\n            "apps",\n          ],\n          resources: [\n            "daemonsets",\n            "deployments",\n            "deployments/rollback",\n            "deployments/scale",\n            "replicasets",\n            "replicasets/scale",\n            "statefulsets",\n          ],\n          verbs: [\n            "create",\n            "delete",\n            "deletecollection",\n            "get",\n            "list",\n            "patch",\n            "update",\n            "watch",\n          ],\n        },\n        {\n          apiGroups: [\n            "autoscaling",\n          ],\n          resources: [\n            "horizontalpodautoscalers",\n          ],\n          verbs: [\n            "create",\n            "delete",\n            "deletecollection",\n            "get",\n            "list",\n            "patch",\n            "update",\n            "watch",\n          ],\n        },\n        {\n          apiGroups: [\n            "batch",\n          ],\n          resources: [\n            "cronjobs",\n            "jobs",\n          ],\n          verbs: [\n            "create",\n            "delete",\n            "deletecollection",\n            "get",\n            "list",\n            "patch",\n            "update",\n            "watch",\n          ],\n        },\n        {\n          apiGroups: [\n            "extensions",\n          ],\n          resources: [\n            "daemonsets",\n            "deployments",\n            "deployments/rollback",\n            "deployments/scale",\n            "ingresses",\n            "networkpolicies",\n            "replicasets",\n            "replicasets/scale",\n            "replicationcontrollers/scale",\n          ],\n          verbs: [\n            "create",\n            "delete",\n            "deletecollection",\n            "get",\n            "list",\n            "patch",\n            "update",\n            "watch",\n          ],\n        },\n        {\n          apiGroups: [\n            "policy",\n          ],\n          resources: [\n            "poddisruptionbudgets",\n          ],\n          verbs: [\n            "create",\n            "delete",\n            "deletecollection",\n            "get",\n            "list",\n            "patch",\n            "update",\n            "watch",\n          ],\n        },\n        {\n          apiGroups: [\n            "networking.k8s.io",\n          ],\n          resources: [\n            "networkpolicies",\n          ],\n          verbs: [\n            "create",\n            "delete",\n            "deletecollection",\n            "get",\n            "list",\n            "patch",\n            "update",\n            "watch",\n          ],\n        },\n      ],\n    },\n    {\n      apiVersion: "rbac.authorization.k8s.io/v1",\n      kind: "RoleBinding",\n      metadata: {\n        name: request.parent.spec.owner,\n        namespace: request.parent.metadata.namespace,\n      },\n      roleRef: {\n        apiGroup: "rbac.authorization.k8s.io",\n        kind: "Role",\n        name: "edit",\n      },\n      subjects: [{\n        kind: "ServiceAccount",\n        name: request.parent.spec.owner,\n        namespace: params.namespace,\n      },],\n    },\n  ],\n  children: children,\n  status: {\n    phase: "Active",\n    conditions: [{\n      type: "Ready"\n    },],\n    created: true,\n    //debug\n    request_parent: request.parent,\n    request_children: request.children,\n  },\n}\n',
      "sync-project.jsonnet": 'function(request) {\n  local apiVersion = "kubeflow.org/v1alpha1",\n  local template = request.parent.spec.template,\n  local children = [{\n    apiVersion: apiVersion,\n    kind: "Workspace",\n    metadata: {\n      name: template.metadata.name,\n      namespace: request.parent.metadata.namespace,\n    },\n    spec: {\n      namespace: template.spec.namespace,\n      owner: template.spec.owner,\n    },\n  },],\n  children: children,\n  status: {\n    phase: "Active",\n    conditions: [{\n      type: "Ready"\n    },],\n    created: true,\n    //debug\n    request_parent: request.parent,\n    request_children: request.children,\n  },\n}\n',
      "sync-workspace.jsonnet": "function(request) {\n  local params = {\n  \"name\": \"projects\",\n  \"namespace\": \"kf-001\"\n},\n  local children = [\n    {\n      apiVersion: \"v1\",\n      kind: \"Namespace\",\n      metadata: {\n        name: request.parent.spec.namespace,\n        labels: {\n          app: request.parent.spec.namespace,\n        },\n      },\n      status: {\n        phase: \"Pending\",\n      },\n    },\n    {\n      apiVersion: 'kubeflow.org/v1alpha1',\n      kind: 'Permission',\n      metadata: {\n        name: 'permission',\n        namespace: request.parent.spec.namespace,\n      },\n      spec: {\n        owner: request.parent.spec.owner,\n      },\n    },\n  ],\n  children: children,\n  status: {\n    phase: \"Active\",\n    conditions: [{\n      type: \"Ready\",\n    }],\n    created: true,\n    //debug\n    request_parent: request.parent,\n    request_children: request.children,\n  },\n}\n",
    },
    kind: "ConfigMap",
    metadata: {
      name: "projects",
      namespace: "kf-001",
    },
  }
) &&

std.assertEqual(
  instance.parts.projectsDeployment,
  {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "projects",
      namespace: "kf-001",
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
              image: "metacontroller/jsonnetd@sha256:25c25f217ad030a0f67e37078c33194785b494569b0c088d8df4f00da8fd15a0",
              imagePullPolicy: "Always",
              name: "hooks",
              volumeMounts: [
                {
                  mountPath: "/opt/projects/hooks",
                  name: "hooks",
                },
              ],
              workingDir: "/opt/projects/hooks",
            },
          ],
          volumes: [
            {
              configMap: {
                name: "projects",
              },
              name: "hooks",
            },
          ],
        },
      },
    },
  }
) &&

std.assertEqual(
  instance.parts.projectsController,
  {
    apiVersion: "metacontroller.k8s.io/v1alpha1",
    kind: "CompositeController",
    metadata: {
      name: "projects-controller",
    },
    spec: {
      childResources: [
        {
          apiVersion: "kubeflow.org/v1alpha1",
          resource: "workspaces",
        },
      ],
      generateSelector: true,
      hooks: {
        sync: {
          webhook: {
            url: "http://projects.kf-001/sync-project",
          },
        },
      },
      parentResource: {
        apiVersion: "kubeflow.org/v1alpha1",
        resource: "projects",
      },
    },
  }
) &&

std.assertEqual(
  instance.parts.workspacesController,
  {
    apiVersion: "metacontroller.k8s.io/v1alpha1",
    kind: "CompositeController",
    metadata: {
      name: "workspaces-controller",
    },
    spec: {
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
      generateSelector: true,
      hooks: {
        sync: {
          webhook: {
            url: "http://projects.kf-001/sync-workspace",
          },
        },
      },
      parentResource: {
        apiVersion: "kubeflow.org/v1alpha1",
        resource: "workspaces",
      },
    },
  }
) &&

std.assertEqual(
  instance.parts.permissionsController,
  {
    apiVersion: "metacontroller.k8s.io/v1alpha1",
    kind: "CompositeController",
    metadata: {
      name: "permissions-controller",
    },
    spec: {
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
      generateSelector: true,
      hooks: {
        sync: {
          webhook: {
            url: "http://projects.kf-001/sync-permission",
          },
        },
      },
      parentResource: {
        apiVersion: "kubeflow.org/v1alpha1",
        resource: "permissions",
      },
    },
  }
)
