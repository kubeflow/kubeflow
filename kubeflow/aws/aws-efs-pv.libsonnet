{
  local k = import "k.libsonnet",
  new(_env, _params):: {
    local params = _params + _env,

    local persistentVolume = {
      apiVersion: "v1",
      kind: "PersistentVolume",
      metadata: {
        name: params.name,
        namespace: params.namespace,
      },
      spec: {
        capacity: {
          storage: params.storageCapacity,
        },
        accessModes: [
          "ReadWriteMany",
        ],
        nfs: {
          server: params.serverIP,
          path: params.path,
        },
      },
    },
    persistentVolume:: persistentVolume,

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
        storageClassName: "nfs-storage",
        volumeName: params.name,
        resources: {
          requests: {
            storage: params.storageCapacity,
          },
        },
      },
    },
    persistentVolumeClaim:: persistentVolumeClaim,

    // Set 777 permissions on the EFS so that non-root users
    // like jovyan can use that NFS share
    local efsPersmissions = {
      apiVersion: "batch/v1",
      kind: "Job",
      metadata: {
        name: "set-efs-permissions",
        namespace: params.namespace,
      },
      spec: {
        template: {
          spec: {
            containers: [
              {
                name: "set-efs-permissions",
                image: params.image,
                command: [
                  "chmod",
                  "777",
                  "/kubeflow-efs",
                ],
                volumeMounts: [
                  {
                    mountPath: "/kubeflow-efs",
                    name: params.name,
                  },
                ],
              },
            ],
            restartPolicy: "OnFailure",
            volumes: [
              {
                name: params.name,
                persistentVolumeClaim: {
                  claimName: params.name,
                  readOnly: false,
                },
              },
            ],
          },
        },
      },
    },
    efsPersmissions:: efsPersmissions,

    parts:: self,
    all:: [
      self.persistentVolume,
      self.persistentVolumeClaim,
      self.efsPersmissions,
    ],

    list(obj=self.all):: k.core.v1.list.new(obj,),
  },
}
