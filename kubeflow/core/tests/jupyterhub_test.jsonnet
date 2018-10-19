local jupyterhub = import "kubeflow/core/jupyterhub.libsonnet";

local params = {
  name: "jupyterhub",
  platform: "gke",
  serviceType: "ClusterIP",
  disks: "null",
  gcpSecretName: "user-gcp-sa",
  image: "gcr.io/kubeflow/jupyterhub-k8s:v20180531-3bb991b1",
  jupyterHubAuthenticator: "iap",
  useJupyterLabAsDefault: true,
  notebookPVCMount: "/home/jovyan",
  registry: "gcr.io",
  repoName: "kubeflow-images-public",
  notebookUid: "-1",
  notebookGid: "-1",
  accessLocalFs: "false",
};
local env = {
  namespace: "foo",
};

local instance = jupyterhub.new(env, params);

std.assertEqual(
  instance.parts.kubeSpawnerConfig,
  {
    apiVersion: "v1",
    data: {
      "jupyterhub_config.py": importstr "../kubeform_spawner.py",
    },
    kind: "ConfigMap",
    metadata: {
      name: "jupyterhub-config",
      namespace: "foo",
    },
  }
) &&

std.assertEqual(
  instance.parts.notebookService,
  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      annotations: {
        "prometheus.io/scrape": "true",
      },
      labels: {
        app: "jupyterhub",
      },
      name: "jupyterhub-0",
      namespace: "foo",
    },
    spec: {
      clusterIP: "None",
      ports: [
        {
          name: "hub",
          port: 8000,
        },
      ],
      selector: {
        app: "jupyterhub",
      },
    },
  }
) &&

std.assertEqual(
  instance.parts.hubStatefulSet,
  {
    apiVersion: "apps/v1beta1",
    kind: "StatefulSet",
    metadata: {
      name: "jupyterhub",
      namespace: "foo",
    },
    spec: {
      replicas: 1,
      serviceName: "",
      template: {
        metadata: {
          labels: {
            app: "jupyterhub",
          },
        },
        spec: {
          containers: [
            {
              command: [
                "jupyterhub",
                "-f",
                "/etc/config/jupyterhub_config.py",
              ],
              env: [
                {
                  name: "NOTEBOOK_PVC_MOUNT",
                  value: "/home/jovyan",
                },
                {
                  name: "PLATFORM_NAME",
                  value: "gke",
                },
                {
                  name: "REGISTRY",
                  value: "gcr.io",
                },
                {
                  name: "REPO_NAME",
                  value: "kubeflow-images-public",
                },
                {
                  name: "KF_AUTHENTICATOR",
                  value: "iap",
                },
                {
                  name: "DEFAULT_JUPYTERLAB",
                  value: true,
                },
                {
                  name: "KF_PVC_LIST",
                  value: "null",
                },
                {
                  name: "GCP_SECRET_NAME",
                  value: "user-gcp-sa",
                },
              ],
              image: "gcr.io/kubeflow/jupyterhub-k8s:v20180531-3bb991b1",
              name: "jupyterhub",
              ports: [
                {
                  containerPort: 8000,
                },
                {
                  containerPort: 8081,
                },
              ],
              volumeMounts: [
                {
                  mountPath: "/etc/config",
                  name: "config-volume",
                },
              ],
            },
          ],
          serviceAccountName: "jupyterhub",
          volumes: [
            {
              configMap: {
                name: "jupyterhub-config",
              },
              name: "config-volume",
            },
          ],
        },
      },
      updateStrategy: {
        type: "RollingUpdate",
      },
    },
  }
) &&

std.assertEqual(
  instance.parts.hubRole,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "Role",
    metadata: {
      name: "jupyter-role",
      namespace: "foo",
    },
    rules: [
      {
        apiGroups: [
          "",
        ],
        resources: [
          "pods",
          "persistentvolumeclaims",
        ],
        verbs: [
          "get",
          "watch",
          "list",
          "create",
          "delete",
        ],
      },
      {
        apiGroups: [
          "",
        ],
        resources: [
          "events",
        ],
        verbs: [
          "get",
          "watch",
          "list",
        ],
      },
    ],
  }
) &&

std.assertEqual(
  instance.parts.notebookRole,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "Role",
    metadata: {
      name: "jupyter-notebook-role",
      namespace: "foo",
    },
    rules: [
      {
        apiGroups: [
          "",
        ],
        resources: [
          "pods",
          "services",
        ],
        verbs: [
          "*",
        ],
      },
      {
        apiGroups: [
          "",
          "apps",
          "extensions",
        ],
        resources: [
          "deployments",
          "replicasets",
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
          "*",
        ],
        verbs: [
          "*",
        ],
      },
      {
        apiGroups: [
          "batch",
        ],
        resources: [
          "jobs",
        ],
        verbs: [
          "*",
        ],
      },
    ],
  }
) &&

std.assertEqual(
  instance.parts.hubService,
  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      annotations: {
        "getambassador.io/config": "---\napiVersion: ambassador/v0\nkind:  Mapping\nname: jupyterhub-lb-hub-mapping\nprefix: /hub/\nrewrite: /hub/\ntimeout_ms: 300000\nservice: jupyterhub-lb.foo\nuse_websocket: true\n---\napiVersion: ambassador/v0\nkind:  Mapping\nname: jupyterhub-lb-user-mapping\nprefix: /user/\nrewrite: /user/\ntimeout_ms: 300000\nservice: jupyterhub-lb.foo\nuse_websocket: true",
      },
      labels: {
        app: "jupyterhub-lb",
      },
      name: "jupyterhub-lb",
      namespace: "foo",
    },
    spec: {
      ports: [
        {
          name: "hub",
          port: 80,
          targetPort: 8000,
        },
      ],
      selector: {
        app: "jupyterhub",
      },
      type: "ClusterIP",
    },
  }
) &&

std.assertEqual(
  instance.parts.hubServiceAccount,
  {
    apiVersion: "v1",
    kind: "ServiceAccount",
    metadata: {
      labels: {
        app: "jupyterhub",
      },
      name: "jupyterhub",
      namespace: "foo",
    },
  }
) &&

std.assertEqual(
  instance.parts.notebookServiceAccount,
  {
    apiVersion: "v1",
    kind: "ServiceAccount",
    metadata: {
      name: "jupyter-notebook",
      namespace: "foo",
    },
  }
) &&

std.assertEqual(
  instance.parts.hubRoleBinding,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "RoleBinding",
    metadata: {
      name: "jupyter-role",
      namespace: "foo",
    },
    roleRef: {
      apiGroup: "rbac.authorization.k8s.io",
      kind: "Role",
      name: "jupyter-role",
    },
    subjects: [
      {
        kind: "ServiceAccount",
        name: "jupyterhub",
        namespace: "foo",
      },
    ],
  }
) &&

std.assertEqual(
  instance.parts.notebookRoleBinding,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "RoleBinding",
    metadata: {
      name: "jupyter-notebook-role",
      namespace: "foo",
    },
    roleRef: {
      apiGroup: "rbac.authorization.k8s.io",
      kind: "Role",
      name: "jupyter-notebook-role",
    },
    subjects: [
      {
        kind: "ServiceAccount",
        name: "jupyter-notebook",
        namespace: "foo",
      },
    ],
  }
)
