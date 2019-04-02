local testSuite = import "kubeflow/common/testsuite.libsonnet";
local awsEfsPv = import "kubeflow/aws/aws-efs-pv.libsonnet";

local params = {
  name: "aws-efs-pv",
  storageCapacity: "1T",
  path: "/kubeflow",
  serverIP: "10.10.10.10",
  image: "gcr.io/kubeflow-images-public/ubuntu:18.04",
};
local env = {
  namespace: "kf-001",
};

local instance = awsEfsPv.new(env, params);

local testCases = [
  {
    actual: instance.parts.persistentVolume,
    expected: {
      apiVersion: "v1",
      kind: "PersistentVolume",
      metadata: {
        name: "aws-efs-pv",
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
    },
  },
  {
    actual: instance.parts.persistentVolumeClaim,
    expected: {
      apiVersion: "v1",
      kind: "PersistentVolumeClaim",
      metadata: {
        name: "aws-efs-pv",
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
        storageClassName: "nfs-storage",
        volumeName: "aws-efs-pv",
      },
    },
  },
  {
    actual: instance.parts.efsPersmissions,
    expected: {
      apiVersion: "batch/v1",
      kind: "Job",
      metadata: {
        name: "set-efs-permissions",
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
                  "/kubeflow-efs",
                ],
                image: "gcr.io/kubeflow-images-public/ubuntu:18.04",
                name: "set-efs-permissions",
                volumeMounts: [
                  {
                    mountPath: "/kubeflow-efs",
                    name: "aws-efs-pv",
                  },
                ],
              },
            ],
            restartPolicy: "OnFailure",
            volumes: [
              {
                name: "aws-efs-pv",
                persistentVolumeClaim: {
                  claimName: "aws-efs-pv",
                  readOnly: false,
                },
              },
            ],
          },
        },
      },
    },
  },
];

testSuite.run(testCases)
