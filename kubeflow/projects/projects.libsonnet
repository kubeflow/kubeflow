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
          local child = {
            apiVersion: "v1",
            kind: "Namespace",
            metadata: {
              name: request.parent.spec.namespace,
              labels: {
                app: request.parent.spec.namespace,
              },
            },
            spec: {
            },
            status: {
              phase: "Pending",
            },
          },
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
                [child]
              else
                []
            else
              [child],
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
      |||,

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
