{
  all(params)::
    $.master(params) + $.worker(params),

  master(params)::
    [$.pod(params, "master", "openmpi-master")],

  worker(params)::
    std.map(
      function(index) $.pod(params, "worker", "openmpi-worker-%d" % index),
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
      subdomain: params.name,
      restartPolicy: "Never",
      terminationGracePeriodSeconds: 30,
      dnsPolicy: "ClusterFirst",
      schedulerName: params.schedulerName,
      volumes: $.getVolumes(params),
      containers: $.getContainers(params, role, hostname),
    },
  },

  getVolumes(params):: [
    {
      name: "kubeflow-openmpi-data",
      emptyDir: {},
    },
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
        defaultMode: 420,  // 0644
      },
    },
  ],

  getContainers(params, role, hostname):: {
    local job = {
      name: "openmpi-job",
      image: params.image,
      imagePullPolicy: params.imagePullPolicy,
      resources: $.getResources(role, params.gpus),
      terminationMessagePath: "/dev/termination-log",
      terminationMessagePolicy: "File",
      workingDir: "/kubeflow/openmpi/data",
      command: [
        "sh",
        params.init,
        role,
        std.toString(params.workers),
        params.exec,
      ],
      ports: [
        {
          containerPort: 2022,
          protocol: "TCP",
        },
      ],
      volumeMounts: [
        {
          name: "kubeflow-openmpi-data",
          mountPath: "/kubeflow/openmpi/data",
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
    },
    local controller = {
      name: "openmpi-controller",
      image: params.controllerImage,
      imagePullPolicy: "Always",
      terminationMessagePath: "/dev/termination-log",
      terminationMessagePolicy: "File",
      workingDir: "/kubeflow/openmpi/data",
      command: [
        "python",
        "/root/controller/main.py",
        "--namespace",
        params.namespace,
      ],
      volumeMounts: [
        {
          name: "kubeflow-openmpi-data",
          mountPath: "/kubeflow/openmpi/data",
        },
      ],
    },

    result:: if role == "master" then [job] else [job, controller],
  }.result,

  getResources(role, gpus)::
    if role == "worker" && gpus > 0 then {
      limits: {
        "nvidia.com/gpu": gpus,
      },
    } else {},
}
