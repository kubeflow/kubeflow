local assets = import "kubeflow/openmpi/assets.libsonnet";
local service = import "kubeflow/openmpi/service.libsonnet";
local serviceaccount = import "kubeflow/openmpi/serviceaccount.libsonnet";
local util = import "kubeflow/openmpi/util.libsonnet";

local ROLE_MASTER = "master";
local ROLE_WORKER = "worker";

{
  all(params)::
    $.master(params) + $.worker(params),

  master(params)::
    [$.pod(params, ROLE_MASTER, $.masterName(params))],

  masterName(params)::
    "%s-%s" % [params.name, ROLE_MASTER],

  worker(params)::
    std.map(
      function(index) $.pod(params, ROLE_WORKER, $.workerName(params, index)),
      std.range(0, params.workers - 1)
    ),

  workerName(params, index)::
    "%s-%s-%d" % [params.name, ROLE_WORKER, index],

  pod(params, role, podName):: {
    kind: "Pod",
    apiVersion: "v1",
    metadata: {
      name: podName,
      namespace: params.namespace,
      labels: {
        app: params.name,
        role: role,
      },
    },
    spec: {
      hostname: podName,
      subdomain: service.name(params),
      restartPolicy: "Never",
      terminationGracePeriodSeconds: 30,
      dnsPolicy: "ClusterFirst",
      schedulerName: params.schedulerName,
      volumes: $.volumes(params),
      containers: $.containers(params, role, podName),
      imagePullSecrets: [{ name: secret } for secret in util.toArray(params.imagePullSecrets)],
      serviceAccountName: serviceaccount.name(params),
      nodeSelector: $.nodeSelector(params, role),
      securityContext: $.securityContext(params),
    },
  },

  volumes(params):: [
    {
      name: "openmpi-data",
      emptyDir: {},
    },
    {
      name: "openmpi-secrets",
      secret: {
        secretName: params.secret,
        defaultMode: 256,  // 0400
      },
    },
    {
      name: "openmpi-assets",
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
        defaultMode: 420,  // 0644
      },
    },
  ] + params.volumes,

  containers(params, role, podName):: {
    local job = {
      name: "openmpi-job",
      image: params.image,
      imagePullPolicy: params.imagePullPolicy,
      resources: std.mergePatch($.resources(params, role), $.customResources(params, role)),
      terminationMessagePath: "/dev/termination-log",
      terminationMessagePolicy: "File",
      workingDir: "/kubeflow/openmpi/data",
      command: [
        "sh",
        params.init,
        role,
        std.toString(params.workers),
        params.exec,
        std.toString(params.initTimeout),
      ],
      ports: [
        {
          containerPort: 2022,
          protocol: "TCP",
        },
      ],
      volumeMounts: [
        {
          name: "openmpi-data",
          mountPath: "/kubeflow/openmpi/data",
        },
        {
          name: "openmpi-assets",
          mountPath: "/kubeflow/openmpi/assets",
        },
        {
          name: "openmpi-secrets",
          mountPath: "/kubeflow/openmpi/secrets",
        },
      ] + params.volumeMounts,
    },
    local controller = {
      name: "openmpi-controller",
      image: params.controllerImage,
      imagePullPolicy: "Always",
      terminationMessagePath: "/dev/termination-log",
      terminationMessagePolicy: "File",
      workingDir: "/kubeflow/openmpi/data",
      command: $.controllerCommand(params, podName),
      env: $.controllerEnv(params),
      volumeMounts: [
        {
          name: "openmpi-data",
          mountPath: "/kubeflow/openmpi/data",
        },
      ] + params.volumeMounts,
    },

    result:: if role == ROLE_MASTER then [job] else [job, controller],
  }.result,

  resources(params, role)::
    if role == ROLE_WORKER then {
      limits: {
        cpu: if params.cpu != "null" then params.cpu,
        memory: if params.memory != "null" then params.memory,
        "nvidia.com/gpu": if params.gpu > 0 then params.gpu,
      },
    } else {},

  nodeSelector(params, role)::
    if role == ROLE_WORKER then util.toObject(params.nodeSelector) else {},

  customResources(params, role)::
    if role == ROLE_WORKER then {
      limits: util.toObject(params.customResources),
    } else {},

  controllerCommand(params, podName):: {
    local common = [
      "python",
      "/kubeflow/openmpi/openmpi-controller/controller/main.py",
      "--namespace",
      params.namespace,
      "--master",
      $.masterName(params),
      "--num-gpus",
      std.toString(params.gpu),
      "--timeout-secs",
      std.toString(params.initTimeout),
    ],

    local download = if params.downloadDataFrom != "null" && params.downloadDataTo != "null" then [
      "--download-data-from",
      params.downloadDataFrom,
      "--download-data-to",
      params.downloadDataTo,
    ] else [],

    local upload = if params.uploadDataFrom != "null" && params.uploadDataTo != "null" then [
      "--upload-data-from",
      params.uploadDataFrom,
      "--upload-data-to",
      "%s/%s/%s/%s" % [params.uploadDataTo, params.namespace, params.name, podName],
    ] else [],

    result:: common + download + upload,
  }.result,

  controllerEnv(params)::
    if params.s3Secret != "null" then [
      {
        name: "AWS_ACCESS_KEY_ID",
        valueFrom: {
          secretKeyRef: {
            name: params.s3Secret,
            key: "AWS_ACCESS_KEY_ID",
          },
        },
      },
      {
        name: "AWS_SECRET_ACCESS_KEY",
        valueFrom: {
          secretKeyRef: {
            name: params.s3Secret,
            key: "AWS_SECRET_ACCESS_KEY",
          },
        },
      },
    ] else [],

  securityContext(params):: {
    runAsUser: if params.runAsUser != "null" then params.runAsUser else {},
    runAsGroup: if params.runAsGroup != "null" then params.runAsGroup else {},
    supplementalGroups: [std.parseInt(g) for g in util.toArray(std.toString(params.supplementalGroups))],
    fsGroup: if params.runAsGroup != "null" then params.runAsGroup else {},
  },
}
