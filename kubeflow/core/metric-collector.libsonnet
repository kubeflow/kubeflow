{
  all(params):: [
    $.parts(params.namespace, params.metricImage, params.targetUrl, params.oauthSecretName).metricServiceAccount,
    $.parts(params.namespace, params.metricImage, params.targetUrl, params.oauthSecretName).metricRole,
    $.parts(params.namespace, params.metricImage, params.targetUrl, params.oauthSecretName).metricRoleBinding,
    $.parts(params.namespace, params.metricImage, params.targetUrl, params.oauthSecretName).deploy,
  ],
  parts(namespace, image, targetUrl, oauthSecretName):: {
    metricServiceAccount: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        labels: {
          app: "metric-collector",
        },
        name: "metric-collector",
        namespace: namespace,
      },
    },
    metricRole:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        labels: {
          app: "metric-collector",
        },
        name: "metric-collector",
      },
      rules: [
        {
          apiGroups: [
            "",
          ],
          resources: [
            "services",
            "events",
          ],
          verbs: [
            "*",
          ],
        },
      ],
    },
    metricRoleBinding:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        labels: {
          app: "metric-collector",
        },
        name: "metric-collector",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "metric-collector",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "metric-collector",
          namespace: namespace,
        },
      ],
    },
    deploy:: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "metric-collector",
        },
        name: "metric-collector",
        namespace: namespace,
      },
      spec: {
        replicas: 2,
        template: {
          metadata: {
            labels: {
              service: "metric-collector",
            },
            namespace: namespace,
          },
          spec: {
            containers: [
              {
                env: [
                  {
                    name: "GOOGLE_APPLICATION_CREDENTIALS",
                    value: "/var/run/secrets/sa/admin-gcp-sa.json",
                  },
                  {
                    name: "CLIENT_ID",
                    valueFrom: {
                      secretKeyRef: {
                        name: oauthSecretName,
                        key: "CLIENT_ID",
                      },
                    },
                  },
                ],
                command: [
                  "python3",
                  "/opt/kubeflow-readiness.py",
                ],
                args: [
                  "--url=" + targetUrl,
                  "--client_id=$(CLIENT_ID)",
                ],
                volumeMounts: [
                  {
                    name: "sa-key",
                    readOnly: true,
                    mountPath: "/var/run/secrets/sa",
                  },
                ],
                image: image,
                name: "exporter",
              },
            ],
            serviceAccountName: "metric-collector",
            restartPolicy: "Always",
            volumes: [
              {
                name: "sa-key",
                secret: {
                  secretName: "admin-gcp-sa",
                },
              },
            ],
          },
        },
      },
    },  // deploy
  },  // parts
}
