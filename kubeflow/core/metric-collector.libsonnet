{
  all(params):: [
    $.parts(params.namespace, params.metricImage, params.targetUrl, params.oauthSecretName).deploy,
  ],

  parts(namespace, image, targetUrl, oauthSecretName):: {
    deploy:: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
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
