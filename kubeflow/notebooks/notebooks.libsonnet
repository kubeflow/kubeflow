{
  local util = import "kubeflow/core/util.libsonnet",

  new(_env, _params):: {
    local params = _env + _params,

    local openApiV3Schema = import "notebooks.schema",

    local crd = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "notebooks.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        version: "v1alpha1",
        scope: "Cluster",
        names: {
          plural: "notebooks",
          singular: "notebook",
          kind: "Notebook",
        },
        validation: {
          openAPIV3Schema: openApiV3Schema,
        },
      },
    },
    crd:: crd,

    local syncNotebook =
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
              resource.metadata.namespace == request.parent.spec.namespace &&
              resource.metadata.name == request.parent.spec.name then
                true
              else
                false,
          }.return,
          local podTemplate = request.parent.spec.template,
          local foundChildren = std.filter(existingResource, 
            std.flattenArrays(std.map(existingResources, existingGroups))),
          local children = [
            {
              apiVersion: 'v1',
              kind: 'Service',
              metadata: {
                annotations: {
                  'getambassador.io/config': 
                    std.join("\n", [
                      "---",
                      "apiVersion: ambassador/v0",
                      "kind:  Mapping",
                      "name: notebook-mapping",
                      "prefix: /user/",
                      "rewrite: /user/",
                      "timeout_ms: 300000",
                      "service: notebook." + request.parent.metadata.namespace,
                    ]),
                },
                labels: {
                  app: 'notebook',
                },
                name: 'notebook',
                namespace: request.parent.metadata.namespace,
              },
              spec: {
                ports: [
                  {
                    port: 80,
                    protocol: 'TCP',
                    targetPort: 8082,
                  },
                ],
                selector: {
                  app: 'notebook',
                },
                sessionAffinity: 'None',
                type: 'ClusterIP',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Pod',
              metadata: {
                labels: {
                  component: 'singleuser-server',
                },
                name: 'notebook',
                namespace: request.parent.metadata.namespace,
              },
              spec: {
                containers: [
                  {
                    args: [
                      'start-singleuser.sh',
                      '--ip="0.0.0.0"',
                      '--port=8888',
                      '--allow-root',
                    ],
                    env: [
                      {
                        name: 'JUPYTERHUB_API_TOKEN',
                        value: 'ce5d75d8b88243e280898baa677fec35',
                      },
                      {
                        name: 'JPY_API_TOKEN',
                        value: 'ce5d75d8b88243e280898baa677fec35',
                      },
                      {
                        name: 'JUPYTERHUB_CLIENT_ID',
                        value: 'jupyterhub-user-kam',
                      },
                      {
                        name: 'JUPYTERHUB_HOST',
                      },
                      {
                        name: 'JUPYTERHUB_OAUTH_CALLBACK_URL',
                        value: '/user/kam/oauth_callback',
                      },
                      {
                        name: 'JUPYTERHUB_USER',
                        value: 'kam',
                      },
                      {
                        name: 'JUPYTERHUB_API_URL',
                        value: 'http://jupyterhub-0:8081/hub/api',
                      },
                      {
                        name: 'JUPYTERHUB_BASE_URL',
                        value: '/',
                      },
                      {
                        name: 'JUPYTERHUB_SERVICE_PREFIX',
                        value: '/user/kam/',
                      },
                      {
                        name: 'MEM_GUARANTEE',
                        value: '1Gi',
                      },
                      {
                        name: 'CPU_GUARANTEE',
                        value: '500m',
                      },
                    ],
                    image: 'gcr.io/kubeflow-images-public/tensorflow-1.10.1-notebook-cpu:v0.3.0',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'notebook',
                    ports: [
                      {
                        containerPort: 8888,
                        name: 'notebook-port',
                        protocol: 'TCP',
                      },
                    ],
                    resources: {
                      requests: {
                        cpu: '500m',
                        memory: '1Gi',
                      },
                    },
                    volumeMounts: [
                      {
                        mountPath: '/home/jovyan',
                        name: 'volume-kam',
                      },
                    ],
                    workingDir: '/home/jovyan',
                  },
                ],
                restartPolicy: 'Always',
                schedulerName: 'default-scheduler',
                securityContext: {
                  fsGroup: 100,
                  runAsUser: 1000,
                },
                serviceAccount: 'jupyter-notebook',
                serviceAccountName: 'jupyter-notebook',
                volumes: [
                  {
                    name: 'volume-kam',
                    persistentVolumeClaim: {
                      claimName: 'claim-kam',
                    },
                  },
                ],
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
            // debug
            found_children: std.length(foundChildren),
            desired: std.length(desired),
            request_parent: request.parent,
            request_children: request.children,
          },
        }
      |||,

    local configmap = {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "notebooks",
        namespace: params.namespace,
      },
      data: {
        "sync-notebook.jsonnet": syncNotebook,
        "util.libsonnet": importstr "kubeflow/core/util.libsonnet",
      },
    },
    configmap:: configmap,

    local service = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: "notebooks",
        namespace: params.namespace,
      },
      spec: {
        selector: {
          app: "notebooks",
        },
        ports: [
          {
            port: 80,
            targetPort: 8080,
          },
        ],
      },
    },
    service:: service,

    local deployment = {
      apiVersion: "apps/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "notebooks",
        namespace: params.namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            app: "notebooks",
          },
        },
        template: {
          metadata: {
            labels: {
              app: "notebooks",
            },
          },
          spec: {
            containers: [
              {
                name: "hooks",
                image: "metacontroller/jsonnetd:latest",
                imagePullPolicy: "Always",
                workingDir: "/opt/notebooks/hooks",
                volumeMounts: [
                  {
                    name: "hooks",
                    mountPath: "/opt/notebooks/hooks",
                  },
                ],
              },
            ],
            volumes: [
              {
                name: "hooks",
                configMap: {
                  name: "notebooks",
                },
              },
            ],
          },
        },
      },
    },
    deployment:: deployment,

    local controller = {
      apiVersion: "metacontroller.k8s.io/v1alpha1",
      kind: "CompositeController",
      metadata: {
        name: "notebook-controller",
      },
      spec: {
        generateSelector: true,
        parentResource: {
          apiVersion: "kubeflow.org/v1alpha1",
          resource: "notebooks",
        },
        childResources: [
          {
            apiVersion: "v1",
            resource: "services",
          },
          {
            apiVersion: "v1",
            resource: "pods",
          },
        ],
        hooks: {
          sync: {
            webhook: {
              url: "http://notebooks." + params.namespace + "/sync-notebook",
            },
          },
        },
      },
    },
    controller:: controller,

    parts:: self,
    all:: [
      self.crd,
      self.service,
      self.configmap,
      self.deployment,
      self.controller,
    ],

    list(obj=self.all):: util.list(obj),
  },
}
