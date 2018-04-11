{
  all(params):: {
    kind: "ConfigMap",
    apiVersion: "v1",
    metadata: {
      name: "openmpi-assets",
      labels: {
        app: params.name,
        namespace: params.namespace,
      },
    },
    data: {
      "gen_hostfile.sh": importstr "assets/gen_hostfile.sh",
      "init.sh": importstr "assets/init.sh",
      'sshd_config': importstr "assets/sshd_config",
      "mca-params.conf": importstr "assets/mca-params.conf",
    },
  },
}
