{
  all(params):: {
    kind: "Pod",
    apiVersion: "v1",
    metadata: {
      name: "openmpi-master",
      labels: {
        app: params.name,
        namespace: params.namespace,
        role: "master",
      },
    },
    spec: {
      hostname: "openmpi-master",
      subdomain: params.name,
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
                key: "gen_hostfile.sh",
                path: "gen_hostfile.sh",
                mode: 365,  // 0555
              },
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
            defaultMode: 420  // 0644
          },
        },
      ],
      initContainers: [
        {
          name: "hostfile-generator",
          image: "alpine:3.6",
          command: [
            "sh",
            "/kubeflow/openmpi/assets/gen_hostfile.sh",
            params.name,
            params.namespace,
            std.toString(params.workers),
          ],
          volumeMounts: [
            {
              name: "kubeflow-openmpi-workdir",
              mountPath: "/kubeflow/openmpi/workdir",
            },
            {
              name: "kubeflow-openmpi-assets",
              mountPath: "/kubeflow/openmpi/assets",
            },
          ],
          terminationMessagePath: "/dev/termination-log",
          terminationMessagePolicy: "File",
          imagePullPolicy: "IfNotPresent",
        },
      ],
      containers: [
        {
          name: "openmpi-master",
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
}
