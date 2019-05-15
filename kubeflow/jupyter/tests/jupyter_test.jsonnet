local testSuite = import "kubeflow/common/testsuite.libsonnet";
local jupyter = import "kubeflow/jupyter/jupyter.libsonnet";

local params = {
  name: "jupyter",
  platform: "gke",
  serviceType: "ClusterIP",
  gcpSecretName: "user-gcp-sa",
  image: "gcr.io/kubeflow/jupyterhub-k8s:v20180531-3bb991b1",
  jupyterHubAuthenticator: "iap",
  useJupyterLabAsDefault: false,
  notebookUid: "-1",
  notebookGid: "-1",
  accessLocalFs: "false",
  ui: "default",
  storageClass: "null",
  rokSecretName: "secret-rok-{username}",
};
local env = {
  namespace: "foo",
};

local instance = jupyter.new(env, params);

local testCases = [
  {
    actual: instance.parts.kubeSpawnerConfig,
    expected: {
      apiVersion: "v1",
      data: {
        "jupyter_config.py": std.strReplace(importstr "kubeflow/jupyter/jupyter_config.py", "\\\n", ""),
        "template.html": importstr "kubeflow/jupyter/ui/default/template.html",
        "script.js": importstr "kubeflow/jupyter/ui/default/script.js",
        "style.css": importstr "kubeflow/jupyter/ui/default/style.css",
        "spawner.py": std.strReplace(importstr "kubeflow/jupyter/ui/default/spawner.py", "\\\n", ""),
        "spawner_ui_config.yaml": importstr "kubeflow/jupyter/ui/default/config.yaml",
      },
      kind: "ConfigMap",
      metadata: {
        name: "jupyter-config",
        namespace: "foo",
      },
    },
  },
  {
    actual: instance.parts.notebookService,
    expected: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        annotations: {
          "prometheus.io/scrape": "true",
        },
        labels: {
          app: "jupyter",
        },
        name: "jupyter-0",
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
          app: "jupyter",
        },
      },
    },
  },
  {
    actual: instance.parts.hubStatefulSet,
    expected: {
      apiVersion: "apps/v1beta1",
      kind: "StatefulSet",
      metadata: {
        name: "jupyter",
        namespace: "foo",
      },
      spec: {
        replicas: 1,
        serviceName: "",
        template: {
          metadata: {
            labels: {
              app: "jupyter",
            },
          },
          spec: {
            containers: [
              {
                command: [
                  "jupyterhub",
                  "-f",
                  "/etc/config/jupyter_config.py",
                ],
                env: [
                  {
                    name: "KF_AUTHENTICATOR",
                    value: "iap",
                  },
                  {
                    name: "DEFAULT_JUPYTERLAB",
                    value: false,
                  },
                  {
                    name: "STORAGE_CLASS",
                    value: "null",
                  },
                  {
                    name: "ROK_SECRET_NAME",
                    value: "secret-rok-{username}",
                  },
                  {
                    name: "GCP_SECRET_NAME",
                    value: "user-gcp-sa",
                  },
                ],
                image: "gcr.io/kubeflow/jupyterhub-k8s:v20180531-3bb991b1",
                name: "jupyter",
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
            serviceAccountName: "jupyter",
            volumes: [
              {
                configMap: {
                  name: "jupyter-config",
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
    },
  },
  {
    actual: instance.parts.hubRole,
    expected: {
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
            "secrets",
          ],
          verbs: [
            "get",
            "watch",
            "list",
          ],
        },
      ],
    },
  },
  {
    actual: instance.parts.notebookRole,
    expected: {
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
            "pods/log",
            "secrets",
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
    },
  },
  {
    actual: instance.parts.hubService,
    expected: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        annotations: {
          "getambassador.io/config": "---\napiVersion: ambassador/v0\nkind:  Mapping\nname: jupyter-lb-hub-mapping\nprefix: /hub/\nrewrite: /hub/\ntimeout_ms: 300000\nservice: jupyter-lb.foo\nuse_websocket: true\n---\napiVersion: ambassador/v0\nkind:  Mapping\nname: jupyter-lb-user-mapping\nprefix: /user/\nrewrite: /user/\ntimeout_ms: 300000\nservice: jupyter-lb.foo\nuse_websocket: true",
        },
        labels: {
          app: "jupyter-lb",
        },
        name: "jupyter-lb",
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
          app: "jupyter",
        },
        type: "ClusterIP",
      },
    },
  },
  {
    actual: instance.parts.hubServiceAccount,
    expected: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        labels: {
          app: "jupyter",
        },
        name: "jupyter",
        namespace: "foo",
      },
    },
  },
  {
    actual: instance.parts.notebookServiceAccount,
    expected: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "jupyter-notebook",
        namespace: "foo",
      },
    },
  },
  {
    actual: instance.parts.hubRoleBinding,
    expected: {
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
          name: "jupyter",
          namespace: "foo",
        },
      ],
    },
  },
  {
    actual: instance.parts.notebookRoleBinding,
    expected: {
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
    },
  },
  {
    actual: instance.parts.pv,
    expected:
      {
        apiVersion: "v1",
        kind: "PersistentVolume",
        metadata: {
          labels: {
            type: "local",
          },
          name: "local-volume",
        },
        spec: {
          accessModes: [
            "ReadWriteOnce",
          ],
          capacity: {
            storage: "10Gi",
          },
          "local": {
            path: "/mnt/local",
          },
          nodeAffinity: {
            required: {
              nodeSelectorTerms: [
                {
                  matchExpressions: [
                    {
                      key: "kubernetes.io/hostname",
                      operator: "In",
                      values: [
                        "minikube",
                      ],
                    },
                  ],
                },
              ],
            },
          },
          persistentVolumeReclaimPolicy: "Delete",
          storageClassName: "local-storage",
        },
      },
  },
  {
    actual: instance.parts.pvclaim,
    expected:
      {
        apiVersion: "v1",
        kind: "PersistentVolumeClaim",
        metadata: {
          name: "local-notebooks",
        },
        spec: {
          accessModes: [
            "ReadWriteOnce",
          ],
          resources: {
            requests: {
              storage: "10Gi",
            },
          },
          storageClassName: "local-storage",
          volumeName: "local-volume",
        },
      },
  },
];

testSuite.run(testCases)
