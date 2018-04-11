{
  all(params):: {
    kind: "StatefulSet",
    apiVersion: "apps/v1",
    metadata: {
      name: "openmpi-worker",
      namespace: params.namespace,
      labels: {
        app: params.name,
        role: "worker",
      },
    },
    spec: {
      replicas: params.workers,
      serviceName: params.name,
      podManagementPolicy: "Parallel",
      updateStrategy: {
        type: "OnDelete",
      },
      selector: {
        matchLabels: {
          app: params.name,
          role: "worker",
        },
      },
      template: {
        metadata: {
          labels: {
            app: params.name,
            role: "worker",
          },
        },
        spec: {
          restartPolicy: "Always",
          terminationGracePeriodSeconds: 30,
          dnsPolicy: "ClusterFirst",
          schedulerName: "default-scheduler",
          volumes: [
            {
              name: "kubeflow-openmpi-workdir",
              emptyDir: {},
            },
            {
              name: "kubeflow-openmpi-secrets",
              secret: {
                secretName: "openmpi-secrets",
                defaultMode: 256,  // 0400
              },
            },
            {
              name: "kubeflow-openmpi-assets",
              configMap: {
                name: "openmpi-assets",
                items: [
                  {
                    key: "init.sh",
                    path: "init.sh",
                    mode: 365,  // 0555
                  },
                  {
                    key: "sshd_config",
                    path: "sshd_config",
                  },
                  {
                    key: "mca-params.conf",
                    path: "mca-params.conf",
                  },
                ],
                defaultMode: 420,  // 0644
              },
            },
          ],
          containers: [
            {
              name: "openmpi-worker",
              image: params.image,
              command: [
                "sh",
                "/kubeflow/openmpi/assets/init.sh",
              ],
              ports: [
                {
                  containerPort: 2022,
                  protocol: "TCP",
                },
              ],
              resources: {},
              volumeMounts: [
                {
                  name: "kubeflow-openmpi-workdir",
                  mountPath: "/kubeflow/openmpi/workdir",
                },
                {
                  name: "kubeflow-openmpi-assets",
                  mountPath: "/kubeflow/openmpi/assets",
                },
                {
                  name: "kubeflow-openmpi-secrets",
                  mountPath: "/kubeflow/openmpi/secrets",
                },
              ],
              terminationMessagePath: "/dev/termination-log",
              terminationMessagePolicy: "File",
              imagePullPolicy: "IfNotPresent",
            },
          ],
        },
      },
    },
  },
}
