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
        name: "gcp-cred-webhook",
        namespace: namespace,
      },
      spec: {
        template: {
          metadata: {
            labels: {
              app: "gcp-cred-webhook"
            },
          },
          spec: {
            containers: [
              {
                name: "gcp-cred-webhook",
                image: params.image,
                volumeMounts: [{
                  name: "webhook-cert",
                  mountPath: "/etc/webhook/certs",
                  readOnly: true,
                }],
              },
            ],
            volumes: [
              {
                name: "webhook-cert",
                secret: {
                  secretName: "gcp-cred-webhook-certs",
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
          app: "gcp-cred-webhook",
        },
        name: "gcp-cred-webhook",
        namespace: namespace,
      },
      spec: {
        selector: {
          app: "gcp-cred-webhook",
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
        name: "gcp-cred-webhook",
        // This is cluster scope.
      },
      webhooks: [
        {
          // name has to be fully qualified X.X.X
          name: "gcp-cred-webhook.kubeflow.org",
          clientConfig: {
            service: {
              name: "gcp-cred-webhook",
              namespace: namespace,
              path: "/add-cred"
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

    all:: [
      self.deployment,
      self.service,
      self.webhookBootstrapJob,
      self.webhookConfigmap,
      self.webhookConfig,
      self.initServiceAccount,
      self.initClusterRole,
      self.initClusterRoleBinding,
    ],

    list(obj=self.all):: k.core.v1.list.new(obj,),
  }
}
