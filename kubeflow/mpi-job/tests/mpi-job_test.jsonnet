local mpiJob = import "kubeflow/mpi-job/mpi-job.libsonnet";

local paramsSimple = {
  name: "mpi-job-simple",
  gpus: 8,
  image: "mpioperator/tensorflow-benchmarks:v1.13",
  args: "--synthetic,--num_epochs=10",
  command: "mpirun,-mca,btl_tcp_if_exclude,lo,python,/model/train_imagenet_resnet_hvd.py",
};

local paramsCustom = {
  name: "mpi-job-custom",
  replicas: 2,
  gpusPerReplica: 8,
  image: "mpioperator/tensorflow-benchmarks:v1.13",
  args: "--synthetic,--num_epochs=10",
  command: "mpirun,-mca,btl_tcp_if_exclude,lo,python,/model/train_imagenet_resnet_hvd.py",
};

local paramsCustomWithVolume = {
  name: "mpi-job-custom-volume",
  replicas: 2,
  gpusPerReplica: 8,
  image: "mpioperator/tensorflow-benchmarks:v1.13",
  args: "--data=/data,--num_epochs=10",
  command: "mpirun,-mca,btl_tcp_if_exclude,lo,python,/model/train_imagenet_resnet_hvd.py",
  pvcName: "storage-claim",
  volumeMountPath: "/data"
};

local paramsCustomWithVolumeNull = {
  name: "mpi-job-custom-volume",
  replicas: 2,
  gpusPerReplica: 8,
  image: "mpioperator/tensorflow-benchmarks:v1.13",
  args: "--data=/data,--num_epochs=10",
  command: "mpirun,-mca,btl_tcp_if_exclude,lo,python,/model/train_imagenet_resnet_hvd.py",
  pvcName: "null",
  volumeMountPath: "null"
};


local env = {
  namespace: "kubeflow",
};

local mpiJobSimple = mpiJob.parts(env, paramsSimple).mpiJobSimple;
local mpiJobCustom = mpiJob.parts(env, paramsCustom).mpiJobCustom;
local mpiJobCustomWithVolume = mpiJob.parts(env, paramsCustomWithVolume).mpiJobCustom;
local mpiJobCustomWithVolumeNull = mpiJob.parts(env, paramsCustomWithVolumeNull).mpiJobCustom;

std.assertEqual(
  mpiJobSimple,
  {
    apiVersion: "kubeflow.org/v1alpha1",
      kind: "MPIJob",
      metadata: {
        name: "mpi-job-simple",
        namespace: "kubeflow",
      },
      spec: {
        gpus: 8,
        template: {
          spec: {
            containers: [
              {
                name: "mpi-job-simple",
                image: "mpioperator/tensorflow-benchmarks:v1.13",
                command: [
                  "mpirun",
                    "-mca",
                    "btl_tcp_if_exclude",
                    "lo",
                    "python",
                    "/model/train_imagenet_resnet_hvd.py"
                ],
                args: [
                  "--synthetic",
                  "--num_epochs=10",
                ],
              },
            ],
          },
        },
      },
  },
) &&

std.assertEqual(
  mpiJobCustom,
  {
    apiVersion: "kubeflow.org/v1alpha1",
    kind: "MPIJob",
    metadata: {
      name: "mpi-job-custom",
      namespace: "kubeflow",
    },
    spec: {
      replicas: 2,
      template: {
        spec: {
          containers: [
            {
              name: "mpi-job-custom",
              image: "mpioperator/tensorflow-benchmarks:v1.13",
              command: [
                "mpirun",
                "-mca",
                "btl_tcp_if_exclude",
                "lo",
                "python",
                "/model/train_imagenet_resnet_hvd.py"
              ],
              args: [
                "--synthetic",
                "--num_epochs=10",
              ],
              resources: {
                limits: {
                  "nvidia.com/gpu": 8,
                },
              },
            },
          ]
        },
      },
    },
  },
) &&

std.assertEqual(
  mpiJobCustomWithVolume,
  {
    apiVersion: "kubeflow.org/v1alpha1",
    kind: "MPIJob",
    metadata: {
      name: "mpi-job-custom-volume",
      namespace: "kubeflow",
    },
    spec: {
      replicas: 2,
      template: {
        spec: {
          containers: [
            {
              name: "mpi-job-custom-volume",
              image: "mpioperator/tensorflow-benchmarks:v1.13",
              command: [
                "mpirun",
                "-mca",
                "btl_tcp_if_exclude",
                "lo",
                "python",
                "/model/train_imagenet_resnet_hvd.py"
              ],
              args: [
                "--data=/data",
                "--num_epochs=10",
              ],
              resources: {
                limits: {
                  "nvidia.com/gpu": 8,
                },
              },
              volumeMounts: [
                {
                  name: "persistent-storage",
                  mountPath: "/data",
                }
              ],
            },
          ],
          volumes:[
            {
              name: "persistent-storage",
              persistentVolumeClaim: {
                claimName: "storage-claim"
              },
            }
          ]
        },
      },
    },
  },
) &&

std.assertEqual(
  mpiJobCustomWithVolumeNull,
  {
    apiVersion: "kubeflow.org/v1alpha1",
    kind: "MPIJob",
    metadata: {
      name: "mpi-job-custom-volume",
      namespace: "kubeflow",
    },
    spec: {
      replicas: 2,
      template: {
        spec: {
          containers: [
            {
              name: "mpi-job-custom-volume",
              image: "mpioperator/tensorflow-benchmarks:v1.13",
              command: [
                "mpirun",
                "-mca",
                "btl_tcp_if_exclude",
                "lo",
                "python",
                "/model/train_imagenet_resnet_hvd.py"
              ],
              args: [
                "--data=/data",
                "--num_epochs=10",
              ],
              resources: {
                limits: {
                  "nvidia.com/gpu": 8,
                },
              },
            },
          ]
        },
      },
    },
  },
)