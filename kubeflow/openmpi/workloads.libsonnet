{
  master(params):: $.statefulSet(params, "master", 1),

  worker(params):: $.statefulSet(params, "worker", params.workers),

  statefulSet(params, role, replicas):: {
    kind: "StatefulSet",
    apiVersion: "apps/v1",
    metadata: {
      name: "openmpi-%s" % role,
      namespace: params.namespace,
      labels: {
        app: params.name,
        role: role,
      },
    },
    spec: {
      replicas: replicas,
      serviceName: params.name,
      podManagementPolicy: "Parallel",
      updateStrategy: {
        type: "OnDelete",
      },
      selector: {
        matchLabels: {
          app: params.name,
          role: role,
        },
      },
      template: {
        metadata: {
          labels: {
            app: params.name,
            role: role,
          },
        },
        spec: {
          restartPolicy: "Always",
          terminationGracePeriodSeconds: 30,
          dnsPolicy: "ClusterFirst",
          schedulerName: "default-scheduler",
          volumes: [
            {
              name: "kubeflow-openmpi-secrets",
              secret: {
                secretName: params.secret,
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
                    key: "mca-params.conf",
                    path: "mca-params.conf",
                  },
                  {
                    key: "sshd_config",
                    path: "sshd_config",
                  },
                  {
                    key: "ssh_config",
                    path: "ssh_config",
                  },
                  {
                    key: "hostfile",
                    path: "hostfile",
                  },
                ],
                defaultMode: 420  // 0644
              },
            },
          ],
          containers: [
            {
              name: "openmpi-%s" % role,
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
              volumeMounts: [
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
