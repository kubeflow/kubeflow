{
  all(params):: [
    $.configMap(params),
  ],

  name(params):: "%s-assets" % params.name,

  configMap(params):: {
    kind: "ConfigMap",
    apiVersion: "v1",
    metadata: {
      name: $.name(params),
      namespace: params.namespace,
      labels: {
        app: params.name,
      },
    },
    data: {
      "init.sh": importstr "assets/init.sh",
      "mca-params.conf": importstr "assets/mca-params.conf",
      ssh_config: importstr "assets/ssh_config",
      sshd_config: importstr "assets/sshd_config",
      hostfile: $.genHostfile(params),
    },
  },

  genHostfile(params)::
    std.lines(
      std.map(
        function(index) "%(name)s-worker-%(index)d.%(name)s.%(namespace)s slots=%(slots)d" % {
          index: index,
          name: params.name,
          namespace: params.namespace,
          slots: if params.gpu > 1 then params.gpu else 1,
        },
        std.range(0, params.workers - 1)
      )
    ),
}
