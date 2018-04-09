{
  all(params):: {
    kind: "Secret",
    apiVersion: "v1",
    metadata: {
      name: "openmpi-secrets",
      labels: {
        app: params.name
      },
    },
    data: {
      "authorized_keys": params.pubkey,
      "id_rsa": params.prikey,
      "id_rsa.pub": params.pubkey,
      "config": std.base64(|||
        StrictHostKeyChecking no
        IdentityFile /root/.ssh/id_rsa
        Port 2022
        UserKnownHostsFile=/dev/null
      |||),
    },
    type: "Opaque",
  },
}
