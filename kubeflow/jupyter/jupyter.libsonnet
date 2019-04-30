{
  local k = import "k.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",
  new(_env, _params):: {
    local params = _params + _env,

    local defaultSpawnerData = {
      // Default JH Spawner UI files
      "template.html": importstr "ui/default/template.html",
      "script.js": importstr "ui/default/script.js",
      "style.css": importstr "ui/default/style.css",
      "spawner.py": std.strReplace(importstr "ui/default/spawner.py", "\\\n", ""),
      "spawner_ui_config.yaml": importstr "ui/default/config.yaml",
    },

    local rokSpawnerData = {
      // Base files that Rok UI extends or overrides
      "default_template.html": importstr "ui/default/template.html",
      "default_style.css": importstr "ui/default/style.css",
      "default_spawner.py": importstr "ui/default/spawner.py",

      // Rok UI files
      "template.html": importstr "ui/rok/template.html",
      "script.js": importstr "ui/rok/script.js",
      "style.css": importstr "ui/rok/style.css",
      "spawner.py": std.strReplace(importstr "ui/rok/spawner.py", "\\\n", ""),
      "spawner_ui_config.yaml": importstr "ui/rok/config.yaml",
    },

    local kubeSpawnerConfig = {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "jupyter-config",
        namespace: params.namespace,
      },
      // JH config file
      local config = {
        "jupyter_config.py": std.strReplace(importstr "jupyter_config.py", "\\\n", ""),
      },
      data: config +
            if params.ui == "rok" then rokSpawnerData
            else if params.ui == "default" then defaultSpawnerData,
    },
    kubeSpawnerConfig:: kubeSpawnerConfig,

    local notebookService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "jupyter",
        },
        name: "jupyter-0",
        namespace: params.namespace,
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
          app: "jupyter",
        },
      },
    },
    notebookService:: notebookService,

    local hubService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "jupyter-lb",
        },
        name: "jupyter-lb",
        namespace: params.namespace,
        annotations: {
          "getambassador.io/config":
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: jupyter-lb-hub-mapping",
              "prefix: /hub/",
              "rewrite: /hub/",
              "timeout_ms: 300000",
              "service: jupyter-lb." + params.namespace,
              "use_websocket: true",
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: jupyter-lb-user-mapping",
              "prefix: /user/",
              "rewrite: /user/",
              "timeout_ms: 300000",
              "service: jupyter-lb." + params.namespace,
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
          app: "jupyter",
        },
        type: params.serviceType,
      },
    },
    hubService:: hubService,

    local hubStatefulSet = {
      apiVersion: "apps/v1beta1",
      kind: "StatefulSet",
      metadata: {
        name: "jupyter",
        namespace: params.namespace,
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
                image: params.image,
                name: "jupyter",
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
                    name: "KF_AUTHENTICATOR",
                    value: params.jupyterHubAuthenticator,
                  },
                  {
                    name: "DEFAULT_JUPYTERLAB",
                    value: params.useJupyterLabAsDefault,
                  },
                  {
                    name: "STORAGE_CLASS",
                    value: params.storageClass,
                  },
                  {
                    name: "ROK_SECRET_NAME",
                    value: params.rokSecretName,
                  },
                  if params.platform == "gke" then
                    {
                      name: "GCP_SECRET_NAME",
                      value: params.gcpSecretName,
                    },
                  if params.platform == "minikube" && std.toString(params.notebookUid) != "-1" then
                    {
                      name: "NOTEBOOK_UID",
                      value: std.toString(params.notebookUid),
                    },
                  if params.platform == "minikube" && std.toString(params.notebookGid) != "-1" then
                    {
                      name: "NOTEBOOK_GID",
                      value: std.toString(params.notebookGid),
                    },
                  if params.platform == "minikube" then
                    {
                      name: "ACCESS_LOCAL_FS",
                      value: std.toString(params.accessLocalFs),
                    },
                ]),
              },  // jupyter container
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
    hubStatefulSet:: hubStatefulSet,

    // contents based on https://github.com/jupyterhub/zero-to-jupyterhub-k8s/blob/master/jupyterhub/templates/hub/rbac.yaml
    local hubRole = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "Role",
      metadata: {
        name: "jupyter-role",
        namespace: params.namespace,
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
    hubRole:: hubRole,

    local notebookRole = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "Role",
      metadata: {
        name: "jupyter-notebook-role",
        namespace: params.namespace,
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
    notebookRole:: notebookRole,

    local hubServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        labels: {
          app: "jupyter",
        },
        name: "jupyter",
        namespace: params.namespace,
      },
    },
    hubServiceAccount:: hubServiceAccount,

    local notebookServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "jupyter-notebook",
        namespace: params.namespace,
      },
    },
    notebookServiceAccount:: notebookServiceAccount,

    local hubRoleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "RoleBinding",
      metadata: {
        name: "jupyter-role",
        namespace: params.namespace,
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
          namespace: params.namespace,
        },
      ],
    },
    hubRoleBinding:: hubRoleBinding,

    local notebookRoleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "RoleBinding",
      metadata: {
        name: "jupyter-notebook-role",
        namespace: params.namespace,
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
          namespace: params.namespace,
        },
      ],
    },
    notebookRoleBinding:: notebookRoleBinding,

    local localstorage = (import "localstorage.libsonnet"),
    pv:: localstorage.pv,
    pvclaim:: localstorage.pvclaim,

    parts:: self,
    all:: [
      self.kubeSpawnerConfig,
      self.notebookService,
      self.hubStatefulSet,
      self.hubRole,
      self.notebookRole,
      self.hubService,
      self.hubServiceAccount,
      self.notebookServiceAccount,
      self.hubRoleBinding,
      self.notebookRoleBinding,
    ] + std.flattenArrays([
      if params.accessLocalFs == "true" then [
        self.pv,
        self.pvclaim,
      ] else [],
    ]),

    list(obj=self.all):: util.list(obj),
  },
}
