{
  local k = import "k.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",
  new(_env, _params):: {
    local params = _params + _env {
      hostname: if std.objectHas(_params, "hostname") then _params.hostname else "null",
    },
    local namespace = params.namespace,

    local deployment = {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "admission-webhook",
        namespace: namespace,
      },
      spec: {
        template: {
          metadata: {
            labels: {
              app: "admission-webhook"
            },
          },
          spec: {
            containers: [
              {
                name: "admission-webhook",
                image: params.image,
                imagePullPolicy: "Always",
                volumeMounts: [{
                  name: "webhook-cert",
                  mountPath: "/etc/webhook/certs",
                  readOnly: true,
                }],
              },
            ],
            serviceAccountName: "webhook",
            volumes: [
              {
                name: "webhook-cert",
                secret: {
                  secretName: "admission-webhook-certs2",
                },
              },
            ],
          },
        },
      },
    },  // deployment
    deployment:: deployment,

    local service = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "admission-webhook",
        },
        name: "admission-webhook",
        namespace: namespace,
      },
      spec: {
        selector: {
          app: "admission-webhook",
        },
        ports: [
          {
            port: 443,
            targetPort: 443,
          },
        ],
      },
    },  // service
    service:: service,

    local webhookConfig = {
      apiVersion: "admissionregistration.k8s.io/v1beta1",
      kind: "MutatingWebhookConfiguration",
      metadata: {
        name: "admission-webhook",
        // This is cluster scope.
      },
      webhooks: [
        {
          // name has to be fully qualified X.X.X
          name: "admission-webhook.kubeflow.org",
          clientConfig: {
            service: {
              name: "admission-webhook",
              namespace: namespace,
              path: "/apply-podpreset"
            },
            // To be patched.
            caBundle: "",
          },
          rules: [
            {
              operations: ["CREATE"],
              apiGroups: [""],
              apiVersions: ["v1"],
              resources: ["pods"],
            },
          ],
        },
      ],
    },  // webhookConfig
    webhookConfig:: webhookConfig,

    local webhookBootstrapJob = {
      apiVersion: "apps/v1",
      kind: "StatefulSet",
      metadata: {
        name: "webhook-bootstrap",
        namespace: namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            service: "webhook-bootstrap",
          },
        },
        template: {
          metadata: {
            labels: {
              service: "webhook-bootstrap",
            },
          },
          spec: {
            restartPolicy: "Always",
            serviceAccountName: "webhook-bootstrap",
            containers: [
              {
                name: "bootstrap",
                image: params.webhookSetupImage,
                command: [
                  "sh",
                  "/var/webhook-config/create_ca.sh",
                ],
                env: [
                  {
                    name: "NAMESPACE",
                    value: namespace,
                  },
                ],
                volumeMounts: [
                  {
                    mountPath: "/var/webhook-config/",
                    name: "webhook-config",
                  },
                ],
              },
            ],
            volumes: [
              {
                configMap: {
                  name: "webhook-bootstrap-config",
                },
                name: "webhook-config",
              },
            ],
          },
        },
      },
    },  // webhookBootstrapJob
    webhookBootstrapJob:: webhookBootstrapJob,

    local initServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "webhook-bootstrap",
        namespace: namespace,
      },
    },  // initServiceAccount
    initServiceAccount:: initServiceAccount,

    local initClusterRoleBinding = {
      kind: "ClusterRoleBinding",
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      metadata: {
        name: "webhook-bootstrap",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "webhook-bootstrap",
          namespace: namespace,
        },
      ],
      roleRef: {
        kind: "ClusterRole",
        name: "webhook-bootstrap",
        apiGroup: "rbac.authorization.k8s.io",
      },
    },  // initClusterRoleBinding
    initClusterRoleBinding:: initClusterRoleBinding,

    local initClusterRole = {
      kind: "ClusterRole",
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      metadata: {
        name: "webhook-bootstrap",
      },
      rules: [
        {
          apiGroups: ["admissionregistration.k8s.io"],
          resources: ["mutatingwebhookconfigurations"],
          verbs: ["*"],
        },
        {
          apiGroups: [""],
          resources: ["secrets"],
          verbs: ["*"],
        },
        {
          apiGroups: [
            "",
          ],
          resources: [
            "pods",
          ],
          verbs: [
            "list",
            "delete",
          ],
        },
      ],
    },  // initClusterRoleBinding
    initClusterRole:: initClusterRole,

    local webhookConfigmap = {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "webhook-bootstrap-config",
        namespace: namespace,
      },
      data: {
        "create_ca.sh": importstr "create_ca.sh",
      }
    },  // webhookConfigmap
    webhookConfigmap:: webhookConfigmap,

local webhookRole = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        name: "webhook-role",
      },
      rules: [
        {
          apiGroups: [
            "apps",
          ],
          resources: [
            "deployments",
          ],
          verbs: [
            "get",
            "watch",
            "list",
            "delete",
            "update",
            "create",
            "patch",
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
            "update",
          ],
        },
        {
         apiGroups: [
            "kubeflow.org",
          ],
          resources: [
            "podpresets",
          ],
          verbs: [
            "get",
            "watch",
            "list",
            "update",
            "create",
            "patch",
            "delete",
          ],

        }
      ],
    },
    webhookRole:: webhookRole,

     local webhookServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "webhook",
        namespace: params.namespace,
      },
    },
    webhookServiceAccount:: webhookServiceAccount,
  
    local webhookRoleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        name: "webhook-role-binding",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "webhook-role",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "webhook",
          namespace: params.namespace,
        },
      ],
    },
    webhookRoleBinding:: webhookRoleBinding,

    all:: [
      self.deployment,
      self.service,
      self.webhookBootstrapJob,
      self.webhookConfigmap,
      self.webhookConfig,
      self.initServiceAccount,
      self.initClusterRole,
      self.initClusterRoleBinding,
      self.webhookServiceAccount,
      self.webhookRole,
      self.webhookRoleBinding,
    ],

    list(obj=self.all):: k.core.v1.list.new(obj,),
  }
}
