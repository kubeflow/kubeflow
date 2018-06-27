local k = import "k.libsonnet";

{
  containerCommand(command)::
    if command != "null" then
      {
        command: [command],
      }
    else {},

  containerArgs(args)::
    if args != "null" then
      {
        args: args,
      }
    else {},

  gpuLimits(gpus)::
    if gpus > 0 then
      {
        resources: {
          limits: {
            "nvidia.com/gpu": gpus,
          },
        },
      }
    else {},

  simple(namespace, name, image, gpus, command, args):: {
    job: {
      apiVersion: "kubeflow.org/v1alpha1",
      kind: "ChainerJob",
      metadata: {
        name: name,
        namespace: namespace,
      },
      spec: {
        master: {
          template: {
            spec: {
              containers: [
                {
                  name: "chainer",
                  image: image,
                } + $.gpuLimits(gpus)
                + $.containerCommand(command)
                + $.containerArgs(std.split(args, ",")),
              ],
            },
          },
        },
      },
    },
  }.job,

  mn(namespace, name, image, backend, gpus, workers, workerSetName, command, args):: {
    local userCommand =
      if command != "null" then
        [command]
      else [],
    local userArgs =
      if args != "null" then
        std.split(args, ",")
      else [],
    local masterContainerCommandArgs =
      if backend == "mpi" then
        $.containerCommand("mpiexec") + $.containerArgs(
          ["-n", std.toString(workers + 1), "-N", "-1", "--allow-run-as-root"]
          + (if gpus > 0 then ["--mca mpi_cuda_support", "0"] else [])
          + userCommand + userArgs
        )
      else {},
    local workerContainerCommandArgs =
      if backend == "mpi" then
        $.containerCommand("sh") + $.containerArgs(
          ["-c", "trap exit TERM; while true; do sleep 1 & wait; done"]
        )
      else {},
    local mpiConfig =
      if backend == "mpi" then
        {
          mpiConfig: {
            slots: if gpus > 0 then gpus else 1,
          },
        }
      else {},

    job: {
      apiVersion: "kubeflow.org/v1alpha1",
      kind: "ChainerJob",
      metadata: {
        name: name,
        namespace: namespace,
      },
      spec: {
        backend: backend,
        master: {
          template: {
            spec: {
              containers: [
                {
                  name: "chainer",
                  image: image,
                } + $.gpuLimits(gpus) + masterContainerCommandArgs,
              ],
            },
          },
        } + mpiConfig,
        workerSets: {
          [workerSetName]: {
            replicas: workers,
            template: {
              spec: {
                containers: [
                  {
                    name: "chainer",
                    image: image,
                  } + $.gpuLimits(gpus) + workerContainerCommandArgs,
                ],
              },
            },
          } + mpiConfig,
        },
      },
    },
  }.job,
}
