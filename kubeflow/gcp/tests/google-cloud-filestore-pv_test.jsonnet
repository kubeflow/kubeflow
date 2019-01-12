local googleCloudFilestorePv = import "kubeflow/gcp/google-cloud-filestore-pv.libsonnet";

local params = {
  name: "google-cloud-filestore-pv",
  storageCapacity: "1T",
  path: "/kubeflow",
  serverIP: "10.10.10.10",
  image: "gcr.io/kubeflow-images-public/ubuntu:18.04",
};
local env = {
  namespace: "kf-001",
};

local instance = googleCloudFilestorePv.new(env, params);

std.assertEqual(
  instance.parts.persistentVolume,
  {
    apiVersion: "v1",
    kind: "PersistentVolume",
    metadata: {
      name: "google-cloud-filestore-pv",
      namespace: "kf-001",
    },
    spec: {
      accessModes: [
        "ReadWriteMany",
      ],
      capacity: {
        storage: "1T",
      },
      nfs: {
        path: "/kubeflow",
        server: "10.10.10.10",
      },
    },
  }
) &&

std.assertEqual(
  instance.parts.persistentVolumeClaim,
  {
    apiVersion: "v1",
    kind: "PersistentVolumeClaim",
    metadata: {
      name: "google-cloud-filestore-pv",
      namespace: "kf-001",
    },
    spec: {
      accessModes: [
        "ReadWriteMany",
      ],
      resources: {
        requests: {
          storage: "1T",
        },
      },
      storageClassName: "",
    },
  }
) &&

std.assertEqual(
  instance.parts.gcfsPersmissions,
  {
    apiVersion: "batch/v1",
    kind: "Job",
    metadata: {
      name: "set-gcfs-permissions",
      namespace: "kf-001",
    },
    spec: {
      template: {
        spec: {
          containers: [
            {
              command: [
                "chmod",
                "777",
                "/kubeflow-gcfs",
              ],
              image: "gcr.io/kubeflow-images-public/ubuntu:18.04",
              name: "set-gcfs-permissions",
              volumeMounts: [
                {
                  mountPath: "/kubeflow-gcfs",
                  name: "google-cloud-filestore-pv",
                },
              ],
            },
          ],
          restartPolicy: "OnFailure",
          volumes: [
            {
              name: "google-cloud-filestore-pv",
              persistentVolumeClaim: {
                claimName: "google-cloud-filestore-pv",
                readOnly: false,
              },
            },
          ],
        },
      },
    },
  }
)
