local service = import "kubeflow/openmpi/service.libsonnet";
local assets = import "kubeflow/openmpi/assets.libsonnet";

{
  all(params)::
    $.master(params) + $.worker(params),

  masterHostname(params):: "%s-master" % params.name,
  master(params)::
    [$.pod(params, "master", $.masterHostname(params))],

  workerHostname(params, index):: "%(name)s-worker-%(index)d" % {
    name: params.name,
    index: index
  },
  worker(params)::
    std.map(
      function(index) $.pod(params, "worker", $.workerHostname(params, index)),
      std.range(0, params.workers - 1)
    ),

  pod(params, role, hostname):: {
    kind: "Pod",
    apiVersion: "v1",
    metadata: {
      name: hostname,
      namespace: params.namespace,
      labels: {
        app: params.name,
        role: role,
      },
    },
    spec: {
      hostname: hostname,
      subdomain: service.name(params),
      restartPolicy: "Never",
      terminationGracePeriodSeconds: 30,
      dnsPolicy: "ClusterFirst",
      schedulerName: params.schedulerName,
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
            name: assets.name(params),
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
          imagePullPolicy: params.imagePullPolicy,
          resources: $.getResources(role, params.gpus),
          terminationMessagePath: "/dev/termination-log",
          terminationMessagePolicy: "File",
          command: [
            "sh",
            params.init,
            role,
            std.toString(params.workers),
            hostname,
            params.exec,
            $.masterHostname(params)
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
        },
      ],
    },
  },

  getResources(role, gpus)::
    if role == "worker" && gpus > 0 then {
      limits: {
        "nvidia.com/gpu": gpus,
      },
    } else {}
}
