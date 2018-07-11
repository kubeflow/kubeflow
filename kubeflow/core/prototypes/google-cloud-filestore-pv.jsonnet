// @apiVersion 0.1
// @name io.ksonnet.pkg.google-cloud-filestore-pv
// @description Creates PV and PVC based on Google Cloud Filestore NFS
// @shortDescription Creates PV and PVC based on Google Cloud Filestore NFS
// @param name string Name for the component
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam storageCapacity string 1T Storage Capacity
// @optionalParam path string /kubeflow Path in NFS server
// @param serverIP string Google Cloud Filestore Server IP

// updatedParams uses the environment namespace if
// the namespace parameter is not explicitly set
local updatedParams = params {
  namespace: if params.namespace == "null" then env.namespace else params.namespace,
};

[
  {
    apiVersion: "v1",
    kind: "PersistentVolume",
    metadata: {
      name: updatedParams.name,
      namespace: updatedParams.namespace,
    },
    spec: {
      capacity: {
        storage: updatedParams.storageCapacity,
      },
      accessModes: [
        "ReadWriteMany",
      ],
      nfs: {
        path: updatedParams.path,
        server: updatedParams.serverIP,
      },
    },
  },
  {
    apiVersion: "v1",
    kind: "PersistentVolumeClaim",
    metadata: {
      name: updatedParams.name,
      namespace: updatedParams.namespace,
    },
    spec: {
      accessModes: [
        "ReadWriteMany",
      ],
      storageClassName: "",
      resources: {
        requests: {
          storage: updatedParams.storageCapacity,
        },
      },
    },
  },
]
