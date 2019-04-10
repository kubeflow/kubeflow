{
  local k = import "k.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",

  new(_env, _params):: {
    local params = _env + _params,

    local defaultSpawnerData = {
      // Default JH Spawner UI files
      "spawner_ui_config.yaml": importstr "./config.yaml",
    },

    local jupyterConfig = {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: params.name + "-config",
        namespace: params.namespace,
      },
      data: defaultSpawnerData,
    },
    jupyterConfig:: jupyterConfig,

    serviceAccount:: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        labels: {
          app: params.name,
        },
        name: params.name,
        namespace: params.namespace,
      },
    },

    clusterRole:: {
      apiVersion: "rbac.authorization.k8s.io/v1",
      kind: "ClusterRole",
      metadata: {
        name: params.name + "-cluster-role",
      },
      rules: [
        {
          apiGroups: [""],
          resources: ["namespaces"],
          verbs: ["get", "list", "create", "delete"]
        },
        {
          apiGroups: ["kubeflow.org"],
          resources: ["notebooks"],
          verbs: ["get", "list", "create", "delete"],
        },
        {
          apiGroups: [""],
          resources: ["persistentvolumeclaims"],
          verbs: ["create", "delete", "get", "list"],
        },
        {
          apiGroups: ["storage.k8s.io"],
          resources: ["storageclasses"],
          verbs: ["get", "list"],
        },
        {
          apiGroups: [""],
          resources: ["secrets"],
          verbs: ["get", "list"],
        },
      ]
    },

    clusterRoleBinding:: {
      kind: "ClusterRoleBinding",
      apiVersion: "rbac.authorization.k8s.io/v1",
      metadata: {
        name: params.name + "-binding"
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: params.name,
          namespace: params.namespace
        },
      ],
      roleRef: {
        kind: "ClusterRole",
        name: params.name + "-cluster-role",
        apiGroup: "rbac.authorization.k8s.io",
      },
    },
    
    notebookRole:: {
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
    
    notebookServiceAccount:: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "jupyter-notebook",
        namespace: params.namespace,
      },
    },
    
    notebookRoleBinding:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "RoleBinding",
      metadata: {
        name: "jupyter-notebook-role-binding",
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

    svc:: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: params.name,
        namespace: params.namespace,
        labels: {
          run: params.name
        },
        annotations:{
          "getambassador.io/config":
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name:  webapp_mapping",
              "prefix: /" + params.prefix + "/",
              "service: " + params.name + "." + params.namespace,
              "add_request_headers: ",
              "  x-forwarded-prefix: /" + params.prefix
            ]),
        },
      },
      spec: {
        type: "ClusterIP",
        ports: [{
          port: 80,
          targetPort: 5000,
          protocol: "TCP",
          name: "http",
        }],
        selector: {
          app: params.name
        },
      },
    },

    depl :: {
      apiVersion: "apps/v1",
      kind: "Deployment",
      metadata: {
        name: params.name,
        namespace: params.namespace,
        labels: {
          app: params.name,
        },
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: params.name,
          },
        },
        template: {
          metadata:{
            labels: {
              app: params.name,
            },
          },
          spec: {
            serviceAccountName: params.name,
            containers: [{
              name: params.name,
              image: params.image,
              env: std.prune([
                {
                  name: "ROK_SECRET_NAME",
                  value: params.rokSecretName,
                },
                {
                  name: "UI",
                  value: params.ui,
                },
              ]),
              volumeMounts: [
                {
                  mountPath: "/etc/config",
                  name: "config-volume",
                },
              ],
              ports: [{
                containerPort: 5000,
              }],
              imagePullPolicy: params.policy,
            }],
            volumes: [
              {
                configMap: {
                  name: params.name + "-config",
                },
                name: "config-volume",
              },
            ],
          },
        },
      },
    },

    parts:: self,
    all:: [
      self.svc,
      self.depl,
      self.jupyterConfig,
      self.serviceAccount,
      self.clusterRoleBinding,
      self.clusterRole,
      self.notebookServiceAccount,
      self.notebookRole,
      self.notebookRoleBinding,
      ],

    list(obj=self.all):: util.list(obj),
  },
}
