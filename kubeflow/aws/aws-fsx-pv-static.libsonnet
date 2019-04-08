{
  local k = import "k.libsonnet",
  new(_env, _params):: {
    local params = _params + _env,
    local namespace = if _params.namespace != "null" then _params.namespace else _env.namespace,

    local persistentVolume = {
      apiVersion: "v1",
      kind: "PersistentVolume",
      metadata: {
        name: params.name,
      },
      spec: {
        capacity: {
          storage: params.storageCapacity,
        },
        volumeMode: "Filesystem",
        persistentVolumeReclaimPolicy: "Recycle",
        storageClassName: params.storageClassName,
        accessModes: [
          "ReadWriteMany",
        ],
        csi: {
          driver: "fsx.csi.aws.com",
          volumeHandle: params.fsxId,
          volumeAttributes: {
            dnsname: params.dnsName
          },
        },
      },
    },
    persistentVolume:: persistentVolume,

    local persistentVolumeClaim = {
      apiVersion: "v1",
      kind: "PersistentVolumeClaim",
      metadata: {
        name: params.name,
        namespace: namespace,
      },
      spec: {
        accessModes: [
          "ReadWriteMany",
        ],
        storageClassName: params.storageClassName,
        resources: {
          requests: {
            storage: params.storageCapacity,
          },
        },
      },
    },
    persistentVolumeClaim:: persistentVolumeClaim,

    parts:: self,
    all:: [
      self.persistentVolume,
      self.persistentVolumeClaim,
    ],

    list(obj=self.all):: k.core.v1.list.new(obj,),
  },
}
