{
  local util = import "kubeflow/core/util.libsonnet",

  new(_env, _params):: {
    local params = _env + _params,

    local projectsCRD = {
      apiVersion: 'apiextensions.k8s.io/v1beta1',
      kind: 'CustomResourceDefinition',
      metadata: {
        name: 'projects.kubeflow.org',
      },
      spec: {
        group: 'kubeflow.org',
        version: 'v1alpha1',
        scope: 'Namespaced',
        names: {
          plural: 'projects',
          singular: 'project',
          kind: 'Project',
          shortNames: [
            'prj',
          ],
        },
        validation: {
          openAPIV3Schema: {
            properties: {
              apiVersion: {
                type: 'string',
              },
              kind: {
                type: 'string',
              },
              metadata: {
                type: 'object',
              },
              spec: {
                type: 'object',
                properties: {
                  selector: {
                    type: 'object',
                  },
                  template: {
                    type: 'object',
                    properties: {
                      metadata: {
                        type: 'object',
                        properties: {
                          name: {
                            type: 'string',
                          },
                        },
                      },
                      spec: {
                        type: 'object',
                        properties: {
                          namespace: {
                            type: 'string',
                          },
                          owner: {
                            type: 'string',
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
                    type: 'int64',
                  },
                },
                type: 'object',
              },
            },
          },
        },
      },
    },
    projectsCRD:: projectsCRD,

    local workspacesCRD = {
      apiVersion: 'apiextensions.k8s.io/v1beta1',
      kind: 'CustomResourceDefinition',
      metadata: {
        name: 'workspaces.kubeflow.org',
      },
      spec: {
        group: 'kubeflow.org',
        version: 'v1alpha1',
        scope: 'Namespaced',
        names: {
          plural: 'workspaces',
          singular: 'workspace',
          kind: 'Workspace',
        },
        validation: {
          openAPIV3Schema: {
            properties: {
              apiVersion: {
                type: 'string',
              },
              kind: {
                type: 'string',
              },
              metadata: {
                type: 'object',
              },
              spec: {
                type: 'object',
                properties: {
                  selector: {
                    type: 'object',
                  },
                  namespace: {
                    type: 'string',
                  },
                  owner: {
                    type: 'string',
                  },
                },
              },
              status: {
                properties: {
                  observedGeneration: {
                    type: 'int64',
                  },
                },
                type: 'object',
              },
            },
          },
        },
      },
    },
    workspacesCRD:: workspacesCRD,

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
          local existingGroups =
            if std.type(request.children) == "object" then
              [ request.children[key] for key in std.objectFields(request.children) ]
            else
              [],
          local existingResources(group) =
            if std.type(group) == "object" then
              [ group[key] for key in std.objectFields(group) ]
            else
              [],
          local existingResource(resource) = {
            return::
              if std.type(resource) == "object" &&
              std.objectHas(resource, 'metadata') &&
              std.objectHas(resource.metadata, 'name') && 
              std.objectHas(request, 'parent') &&
              std.objectHas(request.parent, 'spec') &&
              std.objectHas(request.parent.spec, 'namespace') &&
              resource.metadata.name == request.parent.spec.namespace then
                true
              else
                false,
          }.return,
          local foundChildren = std.filter(existingResource, 
            std.flattenArrays(std.map(existingResources, existingGroups))),
          local initialized = {
            return::
              if std.objectHas(request.parent, "status") &&
                 std.objectHas(request.parent.status, "created") &&
                 request.parent.status.created == true then
                true
              else
                false,
          }.return,
          local child = {
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
          },
          local desired =
            if std.type(foundChildren) != "array" || std.length(foundChildren) == 0 then
              if initialized == false then
                [child]
              else
                [child]
            else
              [child],
          children: desired,
          status: {
            phase: "Active",
            conditions: [{
              type: "Ready"
            },],
            created: true,
            initialized: initialized,
            found_children: std.length(foundChildren),
            desired: std.length(desired),
            request_parent: request.parent,
            request_children: request.children,
          },
        }
      |||,

    local syncWorkspace =
      |||
        function(request) {
          local params = %(params)s,
          local existingGroups =
            if std.type(request.children) == "object" then
              [ request.children[key] for key in std.objectFields(request.children) ]
            else
              [],
          local existingResources(group) =
            if std.type(group) == "object" then
              [ group[key] for key in std.objectFields(group) ]
            else
              [],
          local existingResource(resource) = {
            return::
              if std.type(resource) == "object" &&
              std.objectHas(resource, 'metadata') &&
              std.objectHas(resource.metadata, 'name') && 
              std.objectHas(request, 'parent') &&
              std.objectHas(request.parent, 'spec') &&
              std.objectHas(request.parent.spec, 'namespace') &&
              resource.metadata.name == request.parent.spec.namespace then
                true
              else
                false,
          }.return,
          local foundChildren = std.filter(existingResource, 
            std.flattenArrays(std.map(existingResources, existingGroups))),
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
              apiVersion: 'metacontroller.k8s.io/v1alpha1',
              kind: 'DecoratorController',
              metadata: {
                name: 'rbac-controller',
                namespace: request.parent.spec.namespace,
              },
              spec: {
                resources: [
                  {
                    apiVersion: 'v1',
                    resource: 'serviceaccounts',
                  },
                ],
                attachments: [
                  {
                    apiVersion: 'rbac.authorization.k8s.io/v1',
                    resource: 'roles',
                  },
                  {
                    apiVersion: 'rbac.authorization.k8s.io/v1',
                    resource: 'rolebindings',
                  },
                ],
                hooks: {
                  sync: {
                    webhook: {
                      url: 'http://projects.' + params.namespace + '/sync-rbac',
                    },
                  },
                },
              },
            },
          ],
          local initialized = {
            return::
              if std.objectHas(request.parent, "status") &&
                 std.objectHas(request.parent.status, "created") &&
                 request.parent.status.created == true then
                true
              else
                false,
          }.return,
          local desired =
            if std.type(foundChildren) != "array" || std.length(foundChildren) == 0 then
              if initialized == false then
                children
              else
                []
            else
              children,
          children: desired,
          status: {
            phase: "Active",
            conditions: [{
              type: "Ready",
            }],
            created: true,
            found_children: std.length(foundChildren),
            desired: std.length(desired),
            request_parent: request.parent,
            request_children: request.children,
          },
        }
      ||| %
      {
        params: std.manifestJsonEx(params, "  "),
      },

    local syncRbac =
      |||
        function(request) {
          local params = %(params)s,
          local desired =
            if request.object.metadata.name == "default" then [
            {
              apiVersion: "rbac.authorization.k8s.io/v1",
              kind: "Role",
              metadata: {
                name: "edit",
                namespace: request.object.metadata.namespace,
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
                name: request.object.spec.template.namespace,
                namespace: request.object.spec.template.namespace,
              },
              roleRef: {
                apiGroup: "rbac.authorization.k8s.io",
                kind: "Role",
                name: "edit",
              },
              subjects: [{
                kind: "ServiceAccount",
                name: request.object.spec.template.owner,
                namespace: params.namespace,
              },],
            },
          ] else [],
        
          attachments: desired,
        }
      ||| %
      {
        params: std.manifestJsonEx(params, "  "),
      },

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
        "sync-rbac.jsonnet": syncRbac,
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
                image: "metacontroller/jsonnetd:latest",
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
      apiVersion: 'metacontroller.k8s.io/v1alpha1',
      kind: 'CompositeController',
      metadata: {
        name: 'projects-controller',
      },
      spec: {
        generateSelector: true,
        parentResource: {
          apiVersion: 'kubeflow.org/v1alpha1',
          resource: 'projects',
        },
        childResources: [
          {
            apiVersion: 'kubeflow.org/v1alpha1',
            resource: 'workspaces',
            updateStrategy: {
              method: 'InPlace',
              statusChecks: {
                conditions: [
                  {
                    type: 'phase',
                    status: 'Active',
                  },
                ],
              },
            },
          },
        ],
        hooks: {
          sync: {
            webhook: {
              url: 'http://projects.' + params.namespace + '/sync-project',
            },
          },
        },
      },
    },
    projectsController:: projectsController,

    local workspacesController = {
      apiVersion: 'metacontroller.k8s.io/v1alpha1',
      kind: 'CompositeController',
      metadata: {
        name: 'workspaces-controller',
      },
      spec: {
        generateSelector: true,
        parentResource: {
          apiVersion: 'kubeflow.org/v1alpha1',
          resource: 'workspaces',
        },
        childResources: [
          {
            apiVersion: 'v1',
            resource: 'namespaces',
            updateStrategy: {
              method: 'RollingInPlace',
              statusChecks: {
                conditions: [
                  {
                    type: 'phase',
                    status: 'Active',
                  },
                ],
              },
            },
          },
          {
            apiVersion: 'metacontroller.k8s.io/v1alpha1',
            resource: 'decoratorcontrollers',
            updateStrategy: {
              method: 'RollingInPlace',
              statusChecks: {
                conditions: [
                  {
                    type: 'phase',
                    status: 'Active',
                  },
                ],
              },
            },
          },
        ],
        hooks: {
          sync: {
            webhook: {
              url: 'http://projects.' + params.namespace + '/sync-workspace',
            },
          },
        },
      },
    },
    workspacesController:: workspacesController,

    parts:: self,
    local all = [
      self.projectsCRD,
      self.workspacesCRD,
      self.projectsService,
      self.projectsConfigMap,
      self.projectsDeployment,
      self.projectsController,
      self.workspacesController,
    ],
    all:: all,

    list(obj=self.all):: util.list(obj),
  },
}
