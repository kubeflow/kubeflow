// @apiVersion 0.1
// @name io.ksonnet.pkg.chainer-job
// @description A Chainer Job
// @shortDescription A Chainer Job which support distributed and non-distributed jobs.
// @param name string Name to give to each of the components.
// @optionalParam image string null The image to use for the job.  If null, "everpeace/chainermn:latest" will be used when (workers > 0), "everpeace/chainer:latest" otherwise.  Please see https://github.com/kubeflow/chainer-operator/tree/master/examples/docker for Dockerfiles.
// @optionalParam workers number 1 number of workers.  Resulting cluster size is (workers + 1(master)).
// @optionalParam workerSetName string ws the name of the workerSet.
// @optionalParam backend string mpi backend for distributed mode.  See https://github.com/kubeflow/chainer-operator for details.
// @optionalParam gpus number 1 number of GPUs requested on each worker.
// @optionalParam command string python3 Command to pass to the job.
// @optionalParam args string /train_mnist.py,-e,2,-b,1000,-u,100 Comma separated list of arguments to pass to the job.

local k = import "k.libsonnet";
local chainerJob = import "kubeflow/chainer-job/chainer-job.libsonnet";

local namespace = env.namespace;  // namespace is inherited from the environment
local name = params.name;
local workers = params.workers;
local workerSetName = params.workerSetName;
local backend = params.backend;
local gpus = params.gpus;
local command = params.command;
local args = params.args;

local containerCommand(command) =
  if command != "null" then
    {
      command: [command],
    }
  else {};

local containerArgs(args) =
  if std.length(args) > 0 then
    {
      args: args,
    }
  else {};

local gpuLimits(gpus) =
  if gpus > 0 then
    {
      resources: {
        limits: {
          "nvidia.com/gpu": gpus,
        },
      },
    }
  else {};

if workers > 0 then
  local image = if params.image == "null" then "everpeace/chainermn:latest" else params.image;

  local userCommand =
    if command != "null" then
      [command]
    else [];

  local userArgs =
    if args != "null" then
      std.split(args, ",")
    else [];

  local masterContainerCommandArgs =
    if backend == "mpi" then
      containerCommand("mpiexec") + containerArgs(
        ["-n", std.toString(workers + 1), "-N", "-1", "--allow-run-as-root"]
        + (if gpus > 0 then ["--mca mpi_cuda_support", "0"] else [])
        + userCommand + userArgs
      )
    else {};

  local workerContainerCommandArgs =
    if backend == "mpi" then
      containerCommand("sh") + containerArgs(
        ["-c", "trap exit TERM; while true; do sleep 1 & wait; done"]
      )
    else {};

  local mpiConfig =
    if backend == "mpi" then
      {
        mpiConfig: {
          slots: if gpus > 0 then gpus else 1,
        },
      }
    else {};

  local chainerJob = {
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
              } + gpuLimits(gpus) + masterContainerCommandArgs,
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
                } + gpuLimits(gpus) + workerContainerCommandArgs,
              ],
            },
          },
        } + mpiConfig,
      },
    },
  };

  std.prune(k.core.v1.list.new([
    chainerJob,
  ]))

else
  local image = if params.image == "null" then "everpeace/chainer:latest" else params.image;

  local chainerJobSimple = {
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
              }
              + gpuLimits(gpus)
              + containerCommand(command)
              + containerArgs(std.split(args, ",")),
            ],
          },
        },
      },
    },
  };

  std.prune(k.core.v1.list.new([
    chainerJobSimple,
  ]))
