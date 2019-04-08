{
  local k = import "k.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",
  new(_env, _params):: {
    local params = _params + _env,
    local namespace = if _params.namespace != "null" then _params.namespace else _env.namespace,

    local storageClass = {
      apiVersion: "storage.k8s.io/v1",
      kind: "StorageClass",
      metadata: {
        name: params.name,
      },
      provisioner: "fsx.csi.aws.com",
      parameters: {
        subnetId: params.subnetId,
        securityGroupIds: params.securityGroupIds
      } + if params.s3ImportPath != "null" then {
        s3ImportPath: params.s3ImportPath
      } else {}
    },
    storageClass:: storageClass,

    local persistentVolumeClaim = {
      apiVersion: "v1",
      kind: "PersistentVolumeClaim",
      metadata: {
        name: params.name,
        namespace: params.namespace,
      },
      spec: {
        accessModes: [
          "ReadWriteMany",
        ],
        storageClassName: params.name,
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
      self.storageClass,
      self.persistentVolumeClaim,
    ],

    list(obj=self.all):: k.core.v1.list.new(obj,),
  },
}
