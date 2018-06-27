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
local image =
  if params.image == "null" then
    if workers > 0 then
      "everpeace/chainermn:latest"
    else
      "everpeace/chainer:latest"
  else
    params.image;

local workerSetName = params.workerSetName;
local backend = params.backend;
local gpus = params.gpus;
local command = params.command;
local args = params.args;

if workers > 0 then
  std.prune(k.core.v1.list.new([
    chainerJob.mn(namespace, name, image, backend, gpus, workers, workerSetName, command, args),
  ]))
else
  std.prune(k.core.v1.list.new([
    chainerJob.simple(namespace, name, image, gpus, command, args),
  ]))
