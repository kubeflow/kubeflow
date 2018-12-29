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
  accessLocalFs: "false",
};

local env = {
  namespace: "kf-100",
};

local instance = notebooks.new(env, params);

std.assertEqual(
  instance.parts.notebooksCRD,
  {
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
  }
) &&

std.assertEqual(
  instance.parts.notebooksService,
  {
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
  }
) &&

std.assertEqual(
  instance.parts.notebooksConfigMap,
  {
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
  }
) &&

std.assertEqual(
  instance.parts.notebooksDeployment,
  {
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
              image: "metacontroller/jsonnetd:latest",
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
  }
) &&

std.assertEqual(
  instance.parts.notebooksController,
  {
    apiVersion: "metacontroller.k8s.io/v1alpha1",
    kind: "CompositeController",
    metadata: {
      annotations: {
        accessLocalFs: "false",
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
  }
)
