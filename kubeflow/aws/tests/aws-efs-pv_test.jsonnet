local testSuite = import "kubeflow/common/testsuite.libsonnet";
local awsEfsPv = import "kubeflow/aws/aws-efs-pv.libsonnet";

local params = {
  name: "aws-efs-pv",
  storageCapacity: "100Gi",
  path: "/kubeflow",
  efsId: "fsxxxx",
  image: "gcr.io/kubeflow-images-public/ubuntu:18.04",
  storageClassName: "efs-default"
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
      },
      spec: {
        accessModes: [
          "ReadWriteMany",
        ],
        volumeMode: "Filesystem",
        persistentVolumeReclaimPolicy: "Recycle",
        storageClassName: "efs-default",
        capacity: {
          storage: "100Gi",
        },
        csi: {
          driver: "efs.csi.aws.com",
          volumeHandle: "fsxxxx",
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
            storage: "100Gi",
          },
        },
        storageClassName: "efs-default",
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
