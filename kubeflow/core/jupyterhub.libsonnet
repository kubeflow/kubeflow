{
  all(_params):: self + {
    params+: _params,
  },
  list:: [
    self[key]
    for key in std.objectFieldsAll(self)
    if key != "list" && key != "params" && key != "all"
  ],

  KubeSpawnerConfig:: {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: "jupyterhub-config",
      namespace: $.params.namespace,
    },
    data: {
      "jupyterhub_config.py": importstr "kubeform_spawner.py",
    },
  },
  NotebookService:: {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      labels: {
        app: "tf-hub",
      },
      name: "tf-hub-0",
      namespace: $.params.namespace,
      annotations: {
        "prometheus.io/scrape": "true",
      },
    },
    spec: {
      // We want a headless service so we set the ClusterIP to be None.
      // This headless server is used by individual Jupyter pods to connect back to the Hub.
      clusterIP: "None",
      ports: [
        {
          name: "hub",
          port: 8000,
        },
      ],
      selector: {
        app: "tf-hub",
      },
    },
  },
  HubService:: {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      labels: {
        app: "tf-hub-lb",
      },
      name: "tf-hub-lb",
      namespace: $.params.namespace,
      annotations: {
        "getambassador.io/config":
          std.join("\n", [
            "---",
            "apiVersion: ambassador/v0",
            "kind:  Mapping",
            "name: tf-hub-lb-hub-mapping",
            "prefix: /hub/",
            "rewrite: /hub/",
            "timeout_ms: 300000",
            "service: tf-hub-lb." + $.params.namespace,
            "use_websocket: true",
            "---",
            "apiVersion: ambassador/v0",
            "kind:  Mapping",
            "name: tf-hub-lb-user-mapping",
            "prefix: /user/",
            "rewrite: /user/",
            "timeout_ms: 300000",
            "service: tf-hub-lb." + $.params.namespace,
            "use_websocket: true",
          ]),
      },  //annotations
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
        app: "tf-hub",
      },
      type: $.params.serviceType,
    },
  },
  HubStatefulSet:: {
    apiVersion: "apps/v1beta1",
    kind: "StatefulSet",
    metadata: {
      name: "tf-hub",
      namespace: $.params.namespace,
    },
    spec: {
      replicas: 1,
      serviceName: "",
      template: {
        metadata: {
          labels: {
            app: "tf-hub",
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
              image: $.params.image,
              name: "tf-hub",
              volumeMounts: [
                {
                  mountPath: "/etc/config",
                  name: "config-volume",
                },
              ],
              ports: [
                // Port 8000 is used by the hub to accept incoming requests.
                {
                  containerPort: 8000,
                },
                // Port 8081 accepts callbacks from the individual Jupyter pods.
                {
                  containerPort: 8081,
                },
              ],
              env: std.prune([
                {
                  name: "NOTEBOOK_PVC_MOUNT",
                  value: $.params.notebookPVCMount,
                },
                {
                  name: "CLOUD_NAME",
                  value: $.params.cloud,
                },
                {
                  name: "REGISTRY",
                  value: $.params.registry,
                },
                {
                  name: "REPO_NAME",
                  value: $.params.repoName,
                },
                {
                  name: "KF_AUTHENTICATOR",
                  value: $.params.jupyterHubAuthenticator,
                },
                {
                  name: "KF_PVC_LIST",
                  value: $.params.disks,
                },
                if $.params.cloud == "gke" then
                  {
                    name: "GCP_SECRET_NAME",
                    value: $.params.gcpSecretName,
                  },
                if $.params.cloud == "minikube" && std.toString($.params.notebookUid) != "-1" then
                  {
                    name: "NOTEBOOK_UID",
                    value: std.toString($.params.notebookUid),
                  },
                if $.params.cloud == "minikube" && std.toString($.params.notebookGid) != "-1" then
                  {
                    name: "NOTEBOOK_GID",
                    value: std.toString($.params.notebookGid),
                  },
                if $.params.cloud == "minikube" then
                  {
                    name: "ACCESS_LOCAL_FS",
                    value: std.toString($.params.accessLocalFs),
                  },
              ]),
            },  // jupyterHub container
          ],
          serviceAccountName: "jupyter-hub",
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
  },
  // contents based on https://github.com/jupyterhub/zero-to-jupyterhub-k8s/blob/master/jupyterhub/templates/hub/rbac.yaml
  HubRole:: {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "Role",
    metadata: {
      name: "jupyter-role",
      namespace: $.params.namespace,
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
  },
  NotebookRole:: {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "Role",
    metadata: {
      name: "jupyter-notebook-role",
      namespace: $.params.namespace,
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
  },
  HubServiceAccount:: {
    apiVersion: "v1",
    kind: "ServiceAccount",
    metadata: {
      labels: {
        app: "jupyter-hub",
      },
      name: "jupyter-hub",
      namespace: $.params.namespace,
    },
  },
  NotebookServiceAccount:: {
    apiVersion: "v1",
    kind: "ServiceAccount",
    metadata: {
      name: "jupyter-notebook",
      namespace: $.params.namespace,
    },
  },
  HubRoleBinding:: {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "RoleBinding",
    metadata: {
      name: "jupyter-role",
      namespace: $.params.namespace,
    },
    roleRef: {
      apiGroup: "rbac.authorization.k8s.io",
      kind: "Role",
      name: "jupyter-role",
    },
    subjects: [
      {
        kind: "ServiceAccount",
        name: "jupyter-hub",
        namespace: $.params.namespace,
      },
    ],
  },
  NotebookRoleBinding:: {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "RoleBinding",
    metadata: {
      name: "jupyter-notebook-role",
      namespace: $.params.namespace,
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
        namespace: $.params.namespace,
      },
    ],
  },
}
