{
  all(params):: {
    kind: "StatefulSet",
    apiVersion: "apps/v1",
    metadata: {
      name: "openmpi-worker",
      labels: {
        app: params.name,
        role: "worker",
      },
    },
    spec: {
      replicas: params.workers,
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
          volumes: [
            {
              name: "kubeflow-openmpi-workdir",
              emptyDir: {},
            },
            {
              name: "kubeflow-openmpi-secrets",
              secret: {
                secretName: "openmpi-secrets",
                defaultMode: 256,
              },
            },
            {
              name: "kubeflow-openmpi-assets",
              configMap: {
                name: "openmpi-assets",
                items: [
                  {
                    key: "gen_hostfile.sh",
                    path: "gen_hostfile.sh",
                    mode: 365,
                  },
                  {
                    key: "init.sh",
                    path: "init.sh",
                    mode: 365,
                  },
                  {
                    key: "sshd_config",
                    path: "sshd_config",
                  },
                ],
                defaultMode: 420,
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
          restartPolicy: "Always",
          terminationGracePeriodSeconds: 30,
          dnsPolicy: "ClusterFirst",
          securityContext: {},
          schedulerName: "default-scheduler",
        },
      },
      serviceName: params.name,
      podManagementPolicy: "Parallel",
      updateStrategy: {
        type: "OnDelete",
      },
      revisionHistoryLimit: 10,
    },
  },
}
