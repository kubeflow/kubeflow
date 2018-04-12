{
  all(params):: {
    kind: "ConfigMap",
    apiVersion: "v1",
    metadata: {
      name: "openmpi-assets",
      namespace: params.namespace,
      labels: {
        app: params.name,
      },
    },
    data: {
      "init.sh": importstr "assets/init.sh",
      "mca-params.conf": importstr "assets/mca-params.conf",
      "ssh_config": importstr "assets/ssh_config",
      'sshd_config': importstr "assets/sshd_config",
      "hostfile": $.genHostfile(params),
    },
  },

  genHostfile(params)::
    std.lines(
      std.map(
        function(index) "openmpi-worker-%(index)d.%(name)s.%(namespace)s.svc.cluster.local" % {
          index: index,
          name: params.name,
          namespace: params.namespace,
        },
        std.range(0, params.workers - 1)
      )
    ),
}
