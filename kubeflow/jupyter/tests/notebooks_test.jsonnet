local testSuite = import "kubeflow/common/testsuite.libsonnet";
local notebooks = import "kubeflow/jupyter/notebooks.libsonnet";

// TODO
// Most of these will go away since that can be set directly in Notebook.spec.template.spec
//
local params = {
  image: "gcr.io/kubeflow/jupyterhub-k8s:v20180531-3bb991b1",
  useJupyterLabAsDefault: true,
  notebookPVCMount: "/home/jovyan",
  registry: "gcr.io",
  repoName: "kubeflow-images-public",
  notebookUid: "-1",
  notebookGid: "-1",
  accessLocalFs: "true",
};

local env = {
  namespace: "kf-100",
};

local instance = notebooks.new(env, params);

local testCases = [
  {
    actual: instance.parts.notebooksCRD,
    expected: {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "notebooks.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        names: {
          kind: "Notebook",
          plural: "notebooks",
          singular: "notebook",
        },
        scope: "Namespaced",
        validation: {
          openAPIV3Schema: (import "kubeflow/jupyter/notebooks.schema"),
        },
        version: "v1alpha1",
      },
    },
  },
  {
    actual: instance.parts.notebooksService,
    expected: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: "notebooks",
        namespace: "kf-100",
      },
      spec: {
        ports: [
          {
            port: 80,
            targetPort: 8080,
          },
        ],
        selector: {
          app: "notebooks",
        },
      },
    },
  },
  {
    actual: instance.parts.notebooksConfigMap,
    expected: {
      apiVersion: "v1",
      data: {
        "sync-notebook.jsonnet": (importstr "../sync-notebook.jsonnet"),
        "util.libsonnet": (importstr "kubeflow/jupyter/util.libsonnet"),
      },
      kind: "ConfigMap",
      metadata: {
        name: "notebooks",
        namespace: "kf-100",
      },
    },
  },
  {
    actual: instance.parts.notebooksDeployment,
    expected: {
      apiVersion: "apps/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "notebooks",
        namespace: "kf-100",
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
                image: "metacontroller/jsonnetd@sha256:25c25f217ad030a0f67e37078c33194785b494569b0c088d8df4f00da8fd15a0",
                imagePullPolicy: "Always",
                name: "hooks",
                volumeMounts: [
                  {
                    mountPath: "/opt/notebooks/hooks",
                    name: "hooks",
                  },
                ],
                workingDir: "/opt/notebooks/hooks",
              },
            ],
            volumes: [
              {
                configMap: {
                  name: "notebooks",
                },
                name: "hooks",
              },
            ],
          },
        },
      },
    },
  },
  {
    actual: instance.parts.notebooksController,
    expected:
      {
        apiVersion: "metacontroller.k8s.io/v1alpha1",
        kind: "CompositeController",
        metadata: {
          annotations: {
            accessLocalFs: "true",
            image: "gcr.io/kubeflow/jupyterhub-k8s:v20180531-3bb991b1",
            namespace: "kf-100",
            notebookGid: "-1",
            notebookPVCMount: "/home/jovyan",
            notebookUid: "-1",
            registry: "gcr.io",
            repoName: "kubeflow-images-public",
            useJupyterLabAsDefault: true,
          },
          name: "notebook-controller",
        },
        spec: {
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
          generateSelector: true,
          hooks: {
            sync: {
              webhook: {
                url: "http://notebooks.kf-100/sync-notebook",
              },
            },
          },
          parentResource: {
            apiVersion: "kubeflow.org/v1alpha1",
            resource: "notebooks",
          },
        },
      },
  },
];

testSuite.run(testCases)
