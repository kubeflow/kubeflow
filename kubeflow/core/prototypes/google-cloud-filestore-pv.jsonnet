// @apiVersion 0.1
// @name io.ksonnet.pkg.google-cloud-filestore-pv
// @description Creates PV and PVC based on Google Cloud Filestore NFS
// @shortDescription Creates PV and PVC based on Google Cloud Filestore NFS
// @param name string Name for the component
// @optionalParam storageCapacity string 1T Storage Capacity
// @optionalParam path string /kubeflow Path in NFS server
// @param serverIP string Google Cloud Filestore Server IP
// @optionalParam image string gcr.io/kubeflow-images-public/ubuntu:18.04 The docker image to use

[
  {
    apiVersion: "v1",
    kind: "PersistentVolume",
    metadata: {
      name: params.name,
      namespace: env.namespace,
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
    },
  },
  {
    apiVersion: "v1",
    kind: "PersistentVolumeClaim",
    metadata: {
      name: params.name,
      namespace: env.namespace,
    },
    spec: {
      accessModes: [
        "ReadWriteMany",
      ],
      storageClassName: "",
      resources: {
        requests: {
          storage: params.storageCapacity,
        },
      },
    },
  },
  // Set 777 permissions on the GCFS NFS so that non-root users
  // like jovyan can use that NFS share
  {
    apiVersion: "batch/v1",
    kind: "Job",
    metadata: {
      name: "set-gcfs-permissions",
      namespace: env.namespace,
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
]
