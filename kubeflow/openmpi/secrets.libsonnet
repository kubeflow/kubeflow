{
  all(params):: {
    kind: "Secret",
    apiVersion: "v1",
    metadata: {
      name: "openmpi-secrets",
      labels: {
        app: params.name,
        namespace: params.namespace,
      },
    },
    data: {
      "authorized_keys": params.pubkey,
      "id_rsa": params.prikey,
      "id_rsa.pub": params.pubkey,
      "config": std.base64(importstr "assets/ssh_config"),
    },
    type: "Opaque",
  },
}
