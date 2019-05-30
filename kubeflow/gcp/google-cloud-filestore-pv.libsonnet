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
          path: params.path,
          server: params.serverIP,
        },
        storageClassName: "nfs-storage",
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

    // Set 777 permissions on the GCFS NFS so that non-root users
    // like jovyan can use that NFS share
    local gcfsPersmissions = {
      apiVersion: "batch/v1",
      kind: "Job",
      metadata: {
        name: "set-gcfs-permissions",
        namespace: params.namespace,
      },
      spec: {
        template: {
          spec: {
            containers: [
              {
                name: "set-gcfs-permissions",
                image: params.image,
                command: [
                  "chmod",
                  "777",
                  "/kubeflow-gcfs",
                ],
                volumeMounts: [
                  {
                    mountPath: "/kubeflow-gcfs",
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
    gcfsPersmissions:: gcfsPersmissions,

    parts:: self,
    all:: [
      self.persistentVolume,
      self.persistentVolumeClaim,
      self.gcfsPersmissions,
    ],

    list(obj=self.all):: k.core.v1.list.new(obj,),
  },
}
