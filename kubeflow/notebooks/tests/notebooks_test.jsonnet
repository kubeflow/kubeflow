local notebooks = import "kubeflow/notebooks/notebooks.libsonnet";

local params = {
  disks: "null",
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
        openAPIV3Schema: (import "kubeflow/notebooks/notebooks.schema"),
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
      name: "notebook-controller",
    },
    spec: {
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
