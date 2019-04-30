{
  local util = import "kubeflow/common/util.libsonnet",

  new(_env, _params):: {
    local params = _env + _params,

    local notebooksCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "notebooks.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        version: "v1alpha1",
        scope: "Namespaced",
        names: {
          plural: "notebooks",
          singular: "notebook",
          kind: "Notebook",
        },
        validation: {
          openAPIV3Schema: (import "notebooks.schema"),
        },
      },
    },
    notebooksCRD:: notebooksCRD,

    local notebooksConfigMap = {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "notebooks",
        namespace: params.namespace,
      },
      data: {
        "sync-notebook.jsonnet": (importstr "sync-notebook.jsonnet"),
        "util.libsonnet": (importstr "kubeflow/jupyter/util.libsonnet"),
      },
    },
    notebooksConfigMap:: notebooksConfigMap,

    local notebooksService = {
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
    notebooksService:: notebooksService,

    local notebooksDeployment = {
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
                image: "metacontroller/jsonnetd@sha256:25c25f217ad030a0f67e37078c33194785b494569b0c088d8df4f00da8fd15a0",
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
    notebooksDeployment:: notebooksDeployment,

    local notebooksController = {
      apiVersion: "metacontroller.k8s.io/v1alpha1",
      kind: "CompositeController",
      metadata: {
        name: "notebook-controller",
        annotations: params,
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
            apiVersion: "extensions/v1beta1",
            resource: "deployments",
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
    notebooksController:: notebooksController,

    parts:: self,
    all:: [
      self.notebooksCRD,
      self.notebooksService,
      self.notebooksConfigMap,
      self.notebooksDeployment,
      self.notebooksController,
    ],

    list(obj=self.all):: util.list(obj),
  },
}
